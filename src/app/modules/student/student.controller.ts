import { Request, Response } from 'express';
import { StudentServices } from './student.service';

import studentValidationSchema from './student.validation';

// import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //data validation using zod

    const zodParseData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodParseData);

    //controller will send responce to Client

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    ///VUL ta dorbe akhane neche...res.status aa
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrived successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    // const studentId = req.params.studentId; =====destructuring kora holo
    const { studentId } = req.params;

    const result = StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      succes: true,
      message: 'Single student is retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
