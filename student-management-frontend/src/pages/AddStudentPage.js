import React, { useState } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';
import { createStudent } from '../api';

const AddStudentPage = () => {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState(null); // Success or error message

  const handleSubmit = async (formData) => {
    setFormStatus(null); // Reset the status on each submit

    try {
      await createStudent(formData);
      toast.success('Student added successfully');
      setFormStatus({ type: 'success', message: 'Student added successfully!' });
      setTimeout(() => navigate('/students'), 1500); // Redirect after 1.5s
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        'Failed to add student';
      toast.error(errorMessage);
      setFormStatus({ type: 'error', message: errorMessage });
      console.error('Error adding student:', error);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Add New Student</h1>
      <Card>
        <Card.Body>
          {/* Conditional success/error alert */}
          {formStatus && (
            <Alert variant={formStatus.type === 'success' ? 'success' : 'danger'}>
              {formStatus.message}
            </Alert>
          )}

          {/* Student Form */}
          <StudentForm onSubmit={handleSubmit} isEdit={false} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddStudentPage;
