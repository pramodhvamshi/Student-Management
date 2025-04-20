const express = require('express');
const router = express.Router();
const { 
  getStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} = require('../controllers/studentController');
const { validateStudent } = require('../middleware/validator');

router.route('/')
  .get(getStudents)
  .post(validateStudent, createStudent);

router.route('/:id')
  .get(getStudentById)
  .put(validateStudent, updateStudent)
  .delete(deleteStudent);

module.exports = router;