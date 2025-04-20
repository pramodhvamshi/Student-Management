const { body, validationResult } = require('express-validator');

const validateStudent = [
  body('studentId')
    .notEmpty().withMessage('Student ID is required')
    .matches(/^[a-zA-Z0-9]+$/).withMessage('Student ID must be alphanumeric'),
  
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  
  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  
  body('dob')
    .notEmpty().withMessage('Date of birth is required')
    .isISO8601().toDate().withMessage('Please enter a valid date'),
  
  body('department')
    .notEmpty().withMessage('Department is required'),
  
  body('enrollmentYear')
    .notEmpty().withMessage('Enrollment year is required')
    .isInt({ min: 2000, max: new Date().getFullYear() })
    .withMessage(`Enrollment year must be between 2000 and ${new Date().getFullYear()}`),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateStudent
};