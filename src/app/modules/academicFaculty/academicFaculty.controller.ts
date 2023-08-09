import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFileds } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  //   console.log('this is Faculty Data:', academicFacultyData);
  const result = await academicFacultyService.createFaculty(
    academicFacultyData
  );
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created successfully!',
    data: result,
  });
});
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  console.log('this is authorization', req.headers.authorization);
  console.log('this is requestBody', req.user);
  // const paginationOptions = {
  //   page: req.query.page,
  //   limit: req.query.limit,
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortBy,
  // };
  const filters = pick(req.query, academicFacultyFilterableFileds); //academicFacultyFilterableFileds
  const paginationOptions = pick(req.query, paginationFields);
  // console.log(paginationOptions);

  const result = await academicFacultyService.getAllFaculty(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await academicFacultyService.getSingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Faculty Retrieved successfully!',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const updatedData = req.body;

  const result = await academicFacultyService.updateFaculty(id, updatedData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty updated successfully!',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await academicFacultyService.deleteFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Deleted successfully!',
    data: result,
  });
});

export const academicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
