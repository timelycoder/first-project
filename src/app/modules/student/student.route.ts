import express from 'express';
import { StudentControllers } from './student.controller';
const router = express.Router();

///router will call controller function
router.post('/create-student', StudentControllers.createStudent);

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);

//akaane router nije akta obj tai router name export korlam app.ts ata access korrar jonno
export const StudentRoutes = router;
