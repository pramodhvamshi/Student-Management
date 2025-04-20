import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';
import { fetchStudentById, updateStudent } from '../api';

const EditStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudent = async () => {
      try {
        setLoading(true);
        const data = await fetchStudentById(id);
        setStudent(data);
        setError(null);
      } catch (err) {
        setError('Failed to load student data. Please try again.');
        console.error('Error fetching student:', err);
      } finally {
        setLoading(false);
      }
    };

    getStudent();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateStudent(id, formData);
      toast.success('Student updated successfully');
      navigate('/students');
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.errors?.[0]?.msg || 
        'Failed to update student';
      toast.error(errorMessage);
      console.error('Error updating student:', error);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Edit Student</h1>
      
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Card>
          <Card.Body>
            <StudentForm 
              student={student} 
              onSubmit={handleSubmit} 
              isEdit={true} 
            />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default EditStudentPage;