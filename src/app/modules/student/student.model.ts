import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';
// import {
//   Guardian,
//   LocalGuardian,
//   Student,
//   UserName,
// } from './student/student.interface';

//amra mongoose a CAPITAL boro hater string use korbo
/// R INTERFACE a SMALL soto hater string use korbo
//union er moto mongoose a akta type ase seta holo enum
/// nidisto kono valu theke kono akta valu database save korba,
//ata enum er kaz

//schema use kore joto khusi instance toiri korte parbo
const UserNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const GuardianSchema = new Schema<Guardian>({
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
const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    require: true,
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
  id: { type: String },
  name: UserNameSchema,
  gender: ['male', 'female'], //akahne enum use hoise
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
  },
  contactNo: { type: String },
  emergencyContactNo: { type: String },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // enum third [] use
  presentAddress: {
    type: String,
    required: true,
  },
  parmanentAddress: {
    type: String,
    required: true,
  },
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: { type: String },
  isActive: ['active', 'block'],
});

////now create model below......

export const StudentModel = model<Student>('Student', studentSchema);
