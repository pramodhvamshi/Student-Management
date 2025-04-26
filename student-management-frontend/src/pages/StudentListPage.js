import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner, Alert, Row, Col, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { FaSearch, FaFilter, FaPlus, FaGraduationCap } from 'react-icons/fa';
import { fetchStudents, deleteStudent } from '../api';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await fetchStudents();
      setStudents(data);
      setFilteredStudents(data);
      setError(null);
    } catch (err) {
      setError('Failed to load students. Please try again later.');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStudents(); }, []);

  useEffect(() => {
    let list = [...students];
    const query = searchQuery.toLowerCase();
    if (query) {
      list = list.filter(s =>
        s.studentId.toLowerCase().includes(query) ||
        s.firstName.toLowerCase().includes(query) ||
        s.lastName.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query)
      );
    }
    if (deptFilter !== 'All Departments') {
      list = list.filter(s => s.department === deptFilter);
    }
    setFilteredStudents(list);
  }, [searchQuery, deptFilter, students]);

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

  const departments = ['All Departments', ...Array.from(new Set(students.map(s => s.department)))];

  return (
    <Container className="py-5">
      <Row className="align-items-center mb-4">
        <Col md={4} className="d-flex align-items-center">
          <FaGraduationCap className="text-primary me-2" size={28} />
          <h1 className="fw-bold m-0">Student List</h1>
          <FaFilter className="text-secondary ms-2" />
        </Col>
        <Col md={8} className="d-flex justify-content-end gap-2">
          <InputGroup style={{ maxWidth: '300px' }}>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <FormControl
              placeholder="Search by ID, name, email"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Dropdown onSelect={setDeptFilter}>
            <Dropdown.Toggle variant="outline-secondary" id="dept-filter">
              {deptFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {departments.map(dep => (
                <Dropdown.Item key={dep} eventKey={dep}>{dep}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <LinkContainer to="/add-student">
            <Button variant="success"><FaPlus className="me-1" /> Add Student</Button>
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
          No students found. {students.length > 0 && 'Try adjusting your search or filter.'}
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{`${student.firstName} ${student.lastName}`}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.enrollmentYear}</td>
                <td><span className={`badge bg-${student.isActive ? 'success' : 'secondary'}`}>{student.isActive ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <div className="d-flex gap-2">
                    <LinkContainer to={`/edit-student/${student._id}`}><Button variant="primary" size="sm">Edit</Button></LinkContainer>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(student._id)}>Delete</Button>
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
