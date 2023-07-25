import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import IGenericErrorMessage from '../interfaces/error';

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid ID',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'CastError Error',
    errorMessages: errors,
  };
};
export default handleCastError;
