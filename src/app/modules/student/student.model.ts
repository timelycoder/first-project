import { model, Schema } from 'mongoose';
import {
  Guardian,
  Loaclguardian,
  Student,
  UserName,
} from './student.interface';

///****postman er jonno model dea chatGPT kase data banate dibo... */
///sub-Schema toiri korlam for main StudentSchema jonno. jemaon typer er khetre sub-type toiri kori
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});
const localGuardianSchema = new Schema<Loaclguardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
  },
  name: userNameSchema,
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
