import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { managementDepartmentFilterableFileds } from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.interface';
import { managementDepartmentService } from './managementDepartment.service';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body;
    //   console.log(academicDepartmentData);
    const result = await managementDepartmentService.createManagementDepartment(
      managementDepartmentData
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department is created successfully!',
      data: result,
    });
  }
);
const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, managementDepartmentFilterableFileds);

    const pagination = pick(req.query, paginationFields);

    //   console.log(academicDepartmentData);
    const result = await managementDepartmentService.getAllManagementDepartment(
      filter,
      pagination
    );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    //   console.log('ushiugfhuighfuis', id);
    const result =
      await managementDepartmentService.getSingleManagementDepartment(id);
    //   console.log('this is result', result?.title);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department retrived successfully!',
      data: result,
    });
  }
);
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    console.log('management ID', id);
    const result = await managementDepartmentService.updateManagementDepartment(
      id,
      updatedData
    );
    //   console.log('this is result', result?.title);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'management Department updated successfully!',
      data: result,
    });
  }
);
const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    //   console.log('ushiugfhuighfuis', id);
    const result = await managementDepartmentService.deleteManagementDepartment(
      id
    );
    //   console.log('this is result', result?.title);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department deleted successfully!',
      data: result,
    });
  }
);
export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
