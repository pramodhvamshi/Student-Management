import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaCalendarAlt, FaBuilding, FaIdCard } from 'react-icons/fa'; // Imported Icons

const StudentForm = ({ student, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      const formattedDob = student.dob
        ? new Date(student.dob).toISOString().split('T')[0]
        : '';

      setFormData({
        studentId: student.studentId || '',
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        dob: formattedDob,
        department: student.department || '',
        enrollmentYear: student.enrollmentYear || '',
        isActive: student.isActive !== undefined ? student.isActive : true
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.studentId)) {
      newErrors.studentId = 'Student ID must be alphanumeric';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.enrollmentYear) {
      newErrors.enrollmentYear = 'Enrollment year is required';
    } else {
      const year = parseInt(formData.enrollmentYear);
      const currentYear = new Date().getFullYear();
      if (year < 2000 || year > currentYear) {
        newErrors.enrollmentYear = `Enrollment year must be between 2000 and ${currentYear}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const submissionData = {
        ...formData,
        enrollmentYear: parseInt(formData.enrollmentYear)
      };

      onSubmit(submissionData);
    } else {
      toast.error('Please check the form for errors');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="studentId">
            <Form.Label><FaIdCard className="me-2" /> <b>Student ID</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., S12345"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              pattern="^[A-Za-z]{1}[0-9]{5,}$"
              title="Student ID must start with a letter followed by at least 5 digits (e.g., S12345)"
            />
            <Form.Text className="text-muted">
              Format: One letter followed by numbers (e.g., S12345).
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.studentId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label><FaEnvelope className="me-2" /> <b>Email</b></Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="e.g., student@example.com"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="firstName">
            <Form.Label><FaUser className="me-2" /> <b>First Name</b></Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="lastName">
            <Form.Label><FaUser className="me-2" /> <b>Last Name</b></Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="dob">
            <Form.Label><FaCalendarAlt className="me-2" /> <b>Date of Birth</b></Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              isInvalid={!!errors.dob}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dob}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="department">
            <Form.Label><FaBuilding className="me-2" /> <b>Department</b></Form.Label>
            <Form.Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              isInvalid={!!errors.department}
            >
              <option value="">Select Department</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Aerospace Engineering">Aerospace Engineering</option>
              <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.department}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="enrollmentYear">
            <Form.Label><b>Enrollment Year</b></Form.Label>
            <Form.Control
              type="number"
              name="enrollmentYear"
              value={formData.enrollmentYear}
              onChange={handleChange}
              isInvalid={!!errors.enrollmentYear}
              min="2000"
              max={new Date().getFullYear()}
            />
            <Form.Control.Feedback type="invalid">
              {errors.enrollmentYear}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="isActive">
            <Form.Check
              type="switch"
              label="Active Student"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mt-4"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="w-100 fw-bold">
          {isEdit ? 'Update Student' : 'Add Student'}
        </Button>
      </Form>
    </>
  );
};

export default StudentForm;
