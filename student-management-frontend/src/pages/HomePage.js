import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUserGraduate, FaPlusCircle, FaChartBar } from 'react-icons/fa';

const HomePage = () => {
  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="align-items-center justify-content-center text-center mb-5">
        <Col md={10}>
          <h1 className="display-4 fw-bold mb-3">Welcome to Student Management System</h1>
          <p className="lead text-muted mb-4">
            Effortlessly manage student data with our user-friendly platform. Add, view, and edit records in one place.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <LinkContainer to="/students">
              <Button variant="primary" size="lg" className="px-4">📋 View Students</Button>
            </LinkContainer>
            <LinkContainer to="/add-student">
              <Button variant="success" size="lg" className="px-4">➕ Add Student</Button>
            </LinkContainer>
          </div>
        </Col>
      </Row>

      {/* Feature Cards */}
      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="d-flex flex-column text-center">
              <FaUserGraduate size={50} className="mb-3 text-primary" />
              <Card.Title>Manage Students</Card.Title>
              <Card.Text>
                Easily view, edit, and remove student records in a few clicks.
              </Card.Text>
              <LinkContainer to="/students" className="mt-auto">
                <Button variant="outline-primary">View Students</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="d-flex flex-column text-center">
              <FaPlusCircle size={50} className="mb-3 text-success" />
              <Card.Title>Add Students</Card.Title>
              <Card.Text>
                Create detailed student profiles and save them securely.
              </Card.Text>
              <LinkContainer to="/add-student" className="mt-auto">
                <Button variant="outline-success">Add Student</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="d-flex flex-column text-center">
              <FaChartBar size={50} className="mb-3 text-info" />
              <Card.Title>Performance Insights</Card.Title>
              <Card.Text>
                Analyze student trends and optimize your management strategy.
              </Card.Text>
              <Button variant="outline-info" disabled className="mt-auto">Coming Soon</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
