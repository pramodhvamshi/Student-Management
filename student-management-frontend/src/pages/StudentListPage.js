import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner, Alert, Row, Col, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { fetchStudents, deleteStudent } from '../api';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await fetchStudents();
      setStudents(data);
      setFilteredStudents(data); // Initialize filtered list
      setError(null);
    } catch (err) {
      setError('Failed to load students. Please try again later.');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStudents(students);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = students.filter(
        (student) =>
          student.firstName.toLowerCase().includes(query) ||
          student.lastName.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query) ||
          student.department.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query)
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        toast.success('Student deleted successfully');
        loadStudents();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete student');
        console.error('Error deleting student:', err);
      }
    }
  };

  return (
    <Container className="py-5">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h1 className="fw-bold">Student List</h1>
        </Col>
        <Col md={6} className="d-flex justify-content-end gap-2">
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Search students..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
          <LinkContainer to="/add-student">
            <Button variant="success">+ Add Student</Button>
          </LinkContainer>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : filteredStudents.length === 0 ? (
        <Alert variant="info">
          No students found. {students.length > 0 && 'Try adjusting your search.'}
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm shadow-sm">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Enrollment Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{`${student.firstName} ${student.lastName}`}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.enrollmentYear}</td>
                <td>
                  <span className={`badge bg-${student.isActive ? 'success' : 'secondary'}`}>
                    {student.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <LinkContainer to={`/edit-student/${student._id}`}>
                      <Button variant="primary" size="sm">
                        Edit
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default StudentListPage;
