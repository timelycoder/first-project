import { Student } from './student.interface';
import { StudentModel } from './student.model';

//
///***here BUSINESS LOGIC */

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
