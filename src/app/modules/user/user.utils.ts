import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudentId = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudentId?.id ? lastStudentId.id.substring(4) : undefined;
  // return lastStudentId?.id ? lastStudentId.id.substring(2, 6) : undefined;
};

export const generateStudentID = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // increment by 1

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //20 25
  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  // incrementedId = `${academicSemester.year.substring(2)}-${incrementedId}-${
  //   academicSemester.code
  // }`;
  // console.log(incrementedId);
  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFacultyId = await User.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastFacultyId?.id ? lastFacultyId.id.substring(2) : undefined;
};
export const generateFacultyID = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //20 25
  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdminId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastAdminId?.id ? lastAdminId.id.substring(2) : undefined;
};
export const generateAdminID = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //20 25
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};

// export const findLastAdminId = async (): Promise<string | undefined> => {
//   const lastAdminId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean();
//   return lastAdminId?.id ? lastAdminId.id.substring(2) : undefined;
// };

// export const generateAdminID = async (): Promise<string> => {
//   const currentId =
//     (await findLastAdminId()) || (0).toString().padStart(5, '0');
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementedId = `A-${incrementedId}`;
//   return incrementedId;
// };
