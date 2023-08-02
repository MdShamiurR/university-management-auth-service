import { Model, Types } from 'mongoose';
import { IBloodGroup } from '../../../interfaces/bloodgroup';
import { IGender } from '../../../interfaces/gender';
import { IUserName } from '../../../interfaces/userName';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
// export type Designation='Professor' | 'Lecturer';
export type IFaculty = {
  id: string;
  name: IUserName;
  gender: IGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: IBloodGroup;
  designation: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImage?: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
