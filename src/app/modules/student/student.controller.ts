import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    //client theke 3 vhabe data ante pari
    ///example→ param/,query, big data anbo req.body maddome

    const { student: studentData } = req.body;

    // will call service function to send this data
    const result = await StudentServices.createStudentInToDB(studentData);
    // this controller send response to user

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'students are retrieved  successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieved  successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//controller k export korte hobe jate router use korte pare

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
