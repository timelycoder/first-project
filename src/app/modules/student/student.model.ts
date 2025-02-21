import { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLoaclguardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
// import config from '../../config';

// **UserName Sub-Schema**
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxlength: [20, 'name cannot be more that 20 characeter'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);

    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not capatalize formate',
    // },
    //validate : er  modde function a  value dile ta mul propert value k pawa jay
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

// **Guardian Sub-Schema**
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, "Father's contact number is required"],
    match: [/^\d{10,15}$/, 'Father contact number must be 10-15 digits'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, "Mother's contact number is required"],
    match: [/^\d{10,15}$/, 'Mother contact number must be 10-15 digits'],
  },
});

// **Local Guardian Sub-Schema**
const localGuardianSchema = new Schema<TLoaclguardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Local guardian contact number is required'],
    match: [
      /^\d{10,15}$/,
      'Local guardian contact number must be 10-15 digits',
    ],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Local guardian address is required'],
  },
});

// **Main Student Schema**
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      trim: true,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'password  is required'],

      maxlength: [20, 'password can not be more that 20 character'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required'],
      match: [
        /^\d{4}-\d{2}-\d{2}$/,
        'Date of birth must be in YYYY-MM-DD format',
      ],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address',
      ],
      // validate: {
      //   validator: (value) => validator.isEmail(value),
      //   message: '{VALUE} is not valid',
      // },
    },
    contactNo: {
      type: String,
      trim: true,
      required: [true, 'Contact number is required'],
      match: [/^\d{10,15}$/, 'Contact number must be 10-15 digits'],
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact number is required'],
      match: [/^\d{10,15}$/, 'Emergency contact number must be 10-15 digits'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
        'Profile image must be a valid image URL (png, jpg, jpeg, gif, svg)',
      ],
    },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//
//
/////-----VIRTUAL

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//
//changed model name
//pre save middleware/hook → will work on create(), save () function

studentSchema.pre('save', async function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //document k this bole
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
});
//post save middleware/hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  // console.log(this, 'post hook: we saved our data');
  next();
});
///////////////////////////////////////////////////////////

//query middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
//[ {$match:{isDeleted:{$ne:true}}},{ '$match': { id: 'STU1e2222345' } } ]

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom statics method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

//creating a custom instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//   const exitingUser = await Student.findOne({ id: id });
//   return exitingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

////custom validator use korte chile custom normal  function likte hobe validator : property modde.
//  normal function karom this use korar jonno

// ///****postman er jonno model dea chatGPT kase data banate dibo... */
// ///sub-Schema toiri korlam for main StudentSchema jonno. jemaon typer er khetre sub-type toiri kori
