import Joi from 'joi';

//joi model a import korkon na joi nine akta schema
//creating a schema validation using joi

// **UserName Schema**
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base': '{#value} is not capitalized correctly',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({ 'string.pattern.base': '{#value} is not valid' }),
});

// **Guardian Schema**
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
  fatherContactNo: Joi.string()
    .trim()
    .required()
    .pattern(/^\d{10,15}$/)
    .messages({
      'string.pattern.base': 'Father contact number must be 10-15 digits',
    }),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
  motherContactNo: Joi.string()
    .trim()
    .required()
    .pattern(/^\d{10,15}$/)
    .messages({
      'string.pattern.base': 'Mother contact number must be 10-15 digits',
    }),
});

// **Local Guardian Schema**
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string()
    .trim()
    .required()
    .pattern(/^\d{10,15}$/)
    .messages({
      'string.pattern.base':
        'Local guardian contact number must be 10-15 digits',
    }),
  address: Joi.string().trim().required(),
});

// **Main Student Schema**
const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string()
    .required()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'Date of birth must be in YYYY-MM-DD format',
    }),
  email: Joi.string().trim().email().required(),
  contactNo: Joi.string()
    .trim()
    .required()
    .pattern(/^\d{10,15}$/)
    .messages({
      'string.pattern.base': 'Contact number must be 10-15 digits',
    }),
  emergencyContactNo: Joi.string()
    .trim()
    .required()
    .pattern(/^\d{10,15}$/)
    .messages({
      'string.pattern.base': 'Emergency contact number must be 10-15 digits',
    }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().trim().required(),
  permanentAddress: Joi.string().trim().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string()
    .trim()
    .uri()
    .pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/)
    .messages({
      'string.pattern.base':
        'Profile image must be a valid image URL (png, jpg, jpeg, gif, svg)',
    })
    .optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});
export default studentValidationSchema;
