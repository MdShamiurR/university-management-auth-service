import { Model, Types } from 'mongoose';
import { IBloodGroup } from '../../../interfaces/bloodgroup';
import { IGender } from '../../../interfaces/gender';
import { IUserName } from '../../../interfaces/userName';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

export type IAdmin = {
  id: string;
  name: IUserName;
  gender: IGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
  designation: string;
  profileImage: string;
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup: IBloodGroup;
};
export type AdminModel = Model<IAdmin, Record<string, unknown>>;
export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
