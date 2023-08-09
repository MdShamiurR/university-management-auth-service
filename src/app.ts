import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes

// app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1/', routes); //testing
// app.use('/api/v1/academic-semester/', AcademicSemesterRoutes);

// // testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('Unhandle Promise Rejection'))
//   console.log(x)
// })

// error handaling(bcz 4 perams are there)
// global error handlaler
app.use(globalErrorHandler);

//hanndle not found
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: req.originalUrl,
    errorMessages: [
      {
        path: '.',
        message: 'API Not Found',
      },
    ],
  });
});
// const craeteSem = {
//   year: '2020',
//   code: '01',
// };
// const testID = async () => {
//   const testID = await generateStudentID(craeteSem);
//   console.log(testID);
// };
// testID();

export default app;
