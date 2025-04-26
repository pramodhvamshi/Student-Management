import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUserGraduate, FaPlusCircle } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', minHeight: '100vh' }}>
      <Container className="py-5">
        {/* Hero Section */}
        <Row className="align-items-center justify-content-center text-center mb-5">
          <Col md={10}>
            <h1 className="display-3 fw-bold mb-4" style={{ color: '#343a40' }}>
              Welcome to <span style={{ color: '#0d6efd' }}>Student Management  System</span>
            </h1>
            <p className="lead text-muted mb-4">
              Effortlessly manage student data with our intuitive platform. Add, view, and edit records all in one place.
            </p>
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              <LinkContainer to="/students">
                <Button variant="primary" size="lg" className="d-flex align-items-center gap-2 px-4">
                  📋 <span>View Students</span>
                </Button>
              </LinkContainer>
              <LinkContainer to="/add-student">
                <Button variant="success" size="lg" className="d-flex align-items-center gap-2 px-4">
                  ➕ <span>Add Student</span>
                </Button>
              </LinkContainer>
            </div>
          </Col>
        </Row>

        {/* Feature Cards */}
        <Row className="g-4">
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0 hover-card">
              <Card.Body className="d-flex flex-column text-center p-4">
                <FaUserGraduate size={60} className="mb-3 text-primary" />
                <Card.Title className="mb-2">Manage Students</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Easily view, edit, and remove student records with just a few clicks.
                </Card.Text>
                <LinkContainer to="/students" className="mt-auto">
                  <Button variant="outline-primary" className="w-100">View Students</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 shadow-sm border-0 hover-card">
              <Card.Body className="d-flex flex-column text-center p-4">
                <FaPlusCircle size={60} className="mb-3 text-success" />
                <Card.Title className="mb-2">Add Students</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Create detailed student profiles and securely store them in the system.
                </Card.Text>
                <LinkContainer to="/add-student" className="mt-auto">
                  <Button variant="outline-success" className="w-100">Add Student</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Extra Styles */}
      <style jsx="true">{`
        .hover-card:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease-in-out;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default HomePage;
