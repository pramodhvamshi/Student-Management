import React, { useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserPlus } from 'react-icons/fa';
import StudentForm from '../components/StudentForm';
import { createStudent } from '../api';

const AddStudentPage = () => {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (formData) => {
    setFormStatus(null);
    try {
      await createStudent(formData);
      toast.success('Student added successfully');
      setFormStatus({ type: 'success', message: 'Student added successfully!' });
      setTimeout(() => navigate('/students'), 1500);
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
    <div className="add-student-page">
      <main className="content-wrapper">
        <Card className="add-card shadow-sm">
          <Card.Header className="d-flex align-items-center bg-white border-0 pb-0">
            <FaUserPlus size={28} className="text-success me-2" />
            <h2 className="mb-3">Add New Student</h2>
          </Card.Header>
          <Card.Body className="card-body-scroll">
            {formStatus && (
              <Alert variant={formStatus.type === 'success' ? 'success' : 'danger'}>
                {formStatus.message}
              </Alert>
            )}
            <StudentForm onSubmit={handleSubmit} isEdit={false} />
          </Card.Body>
        </Card>
      </main>

      <style jsx="true">{`
        .add-student-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color:rgb(242, 240, 245);
        }
        .content-wrapper {
          flex: 1 1 auto;
          display: flex;
          justify-content: center;
          align-items: start;
          padding: 2rem;
          overflow: hidden; /* hide main scroll */
        }
        .add-card {
          width: 720px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .add-card .form-control {
          border-radius: 8px;
        }
        
      `}</style>
    </div>
  );
};

export default AddStudentPage;
