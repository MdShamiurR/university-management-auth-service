import { Model } from 'mongoose';

// export type IAcademicFacultyTitles =
//   | 'Faculty of Science and Engineering'
//   | 'Faculty of Business Administration'
//   | 'Faculty of Arts and Social Science';

export type IAcademicFaculty = {
  title: string;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;
export type IAcademicFacultyFilters = {
  searchTerm?: string;
};
