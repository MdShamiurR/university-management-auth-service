import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentService } from './academicDepartment.Service';
import { academicDepartmentFilterableFileds } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  //   console.log(academicDepartmentData);
  const result = await academicDepartmentService.createDepartment(
    academicDepartmentData
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is created successfully!',
    data: result,
  });
});
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, academicDepartmentFilterableFileds);

  const pagination = pick(req.query, paginationFields);

  //   console.log(academicDepartmentData);
  const result = await academicDepartmentService.getAllDepartment(
    filter,
    pagination
  );
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  //   console.log('ushiugfhuighfuis', id);
  const result = await academicDepartmentService.getSingleDepartment(id);
  //   console.log('this is result', result?.title);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department retrived successfully!',
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    //   console.log('ushiugfhuighfuis', id);
    const result = await academicDepartmentService.updateAcademicDepartment(
      id,
      updatedData
    );
    //   console.log('this is result', result?.title);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully!',
      data: result,
    });
  }
);
const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    //   console.log('ushiugfhuighfuis', id);
    const result = await academicDepartmentService.deleteAcademicDepartment(id);
    //   console.log('this is result', result?.title);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department deleted successfully!',
      data: result,
    });
  }
);
export const academicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
