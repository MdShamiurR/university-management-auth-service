import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import IGenericErrorMessage from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  //   console.log(
  //     'start zod',
  //     error.issues.map(issue => issue.path[issue.path.length - 1]),
  //     'end zod'
  //   );
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1], // ektu bujhbo map kore role ber kora ta

      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation',
    errorMessages: errors,
  };
};

export default handleZodError;
