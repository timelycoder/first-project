import express from 'express';

const router = express.Router();
import { StudentController } from './student.controller';

//router will call  controller function.......

router.post('/create-student', StudentController.createStudent);

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
