// service  e database logic thakbe

import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyID, generateStudentID } from './user.utils';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //default password

  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  //generated student id
  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentID(academicSemester);
    user.id = id;
    student.id = id;
    const newStudent = await Student.create([student], { session });
    if (!newStudent) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create Student');
    }
    //set student _id to user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    //transaction = array
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  // user-->student--> academicSemester,academicFaculty,academicDepartment
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
  // const createdUser = await User.create(user);

  // if (!createStudent) {
  //   throw new ApiError(400, 'failed to create user!');
  // }

  // return createdUser;
};
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  //default password

  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }
  // set role
  user.role = 'faculty';

  // const academicSemester = await AcademicSemester.findById(
  //   student.academicSemester
  // );

  //generated faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateFacultyID();
    user.id = id;
    faculty.id = id;
    const newFaculty = await Student.create([faculty], { session });
    if (!newFaculty) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create Faculty');
    }
    //set faculty _id to user.faculty
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });
    //transaction = array
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  // user-->faculty-->academicFaculty,academicDepartment
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
  // const createdUser = await User.create(user);

  // if (!createStudent) {
  //   throw new ApiError(400, 'failed to create user!');
  // }

  // return createdUser;
};

export const UserService = {
  createStudent,
  createFaculty,
};
