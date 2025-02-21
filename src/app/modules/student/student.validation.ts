import { z } from 'zod';

// **UserName Schema**
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters')
    .nonempty('First name is required'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty('Last name is required'),
});

// **Guardian Schema**
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().nonempty("Father's name is required"),
  fatherOccupation: z
    .string()
    .trim()
    .nonempty("Father's occupation is required"),
  fatherContactNo: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, 'Father contact number must be 10-15 digits'),
  motherName: z.string().trim().nonempty("Mother's name is required"),
  motherOccupation: z
    .string()
    .trim()
    .nonempty("Mother's occupation is required"),
  motherContactNo: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, 'Mother contact number must be 10-15 digits'),
});

// **Local Guardian Schema**
const localGuardianValidationSchema = z.object({
  name: z.string().trim().nonempty('Local guardian name is required'),
  occupation: z
    .string()
    .trim()
    .nonempty('Local guardian occupation is required'),
  contactNo: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, 'Local guardian contact number must be 10-15 digits'),
  address: z.string().trim().nonempty('Local guardian address is required'),
});

// **Main Student Schema**
export const studentValidationSchema = z.object({
  id: z.string().trim().nonempty('Student ID is required'),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], { message: 'Invalid gender' }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format'),
  email: z.string().trim().email('Please enter a valid email address'),
  contactNo: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, 'Contact number must be 10-15 digits'),
  emergencyContactNo: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, 'Emergency contact number must be 10-15 digits'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().trim().nonempty('Present address is required'),
  permanentAddress: z.string().trim().nonempty('Permanent address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z
    .string()
    .trim()
    .url('Profile image must be a valid image URL')
    .optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
