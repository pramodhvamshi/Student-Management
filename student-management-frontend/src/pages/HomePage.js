import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUserGraduate, FaPlusCircle } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div style={{ 
      background: 'linear-gradient(120deg, #fdfbfb 0%, #e0e8f0 100%)', 
      minHeight: '100vh', 
      paddingTop: '40px',
      fontFamily: "'Poppins', sans-serif" 
    }}>
      <Container className="py-5">
        {/* Hero Section */}
        <Row className="align-items-center justify-content-center text-center mb-5">
          <Col md={10}>
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#333' }}>
              Welcome to <span style={{ color: '#4facfe' }}>Student Management System</span>
            </h1>
            <p className="lead text-muted mb-4" style={{ fontSize: '1.2rem' }}>
              Manage student records effortlessly with a clean, secure, and modern platform.
            </p>
            <div className="d-flex justify-content-center gap-4 flex-wrap mt-4">
              <LinkContainer to="/students">
                <Button 
                  size="lg" 
                  variant="primary" 
                  className="px-4 py-2 rounded-pill shadow-lg d-flex align-items-center gap-2"
                >
                  <FaUserGraduate size={20} /> View Students
                </Button>
              </LinkContainer>
              <LinkContainer to="/add-student">
                <Button 
                  size="lg" 
                  variant="success" 
                  className="px-4 py-2 rounded-pill shadow-lg d-flex align-items-center gap-2"
                >
                  <FaPlusCircle size={20} /> Add Student
                </Button>
              </LinkContainer>
            </div>
          </Col>
        </Row>

        {/* Feature Cards */}
        <Row className="g-4">
          <Col md={6}>
            <Card className="h-100 border-0 shadow-lg rounded-3 hover-card text-center">
              <Card.Body className="d-flex flex-column align-items-center p-4">
                <FaUserGraduate size={40} className="mb-3 text-primary" />
                <Card.Title className="h5 fw-bold mb-2">Manage Students</Card.Title>
                <Card.Text className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>
                  View, edit, and manage student profiles easily with powerful tools.
                </Card.Text>
                <LinkContainer to="/students" className="mt-auto w-100">
                  <Button variant="outline-primary" className="rounded-pill w-100">
                    View Students
                  </Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 border-0 shadow-lg rounded-3 hover-card text-center">
              <Card.Body className="d-flex flex-column align-items-center p-4">
                <FaPlusCircle size={40} className="mb-3 text-success" />
                <Card.Title className="h5 fw-bold mb-2">Add Students</Card.Title>
                <Card.Text className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>
                  Create detailed student profiles and store them safely.
                </Card.Text>
                <LinkContainer to="/add-student" className="mt-auto w-100">
                  <Button variant="outline-success" className="rounded-pill w-100">
                    Add Student
                  </Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Extra CSS */}
      <style jsx="true">{`
        .hover-card {
          transition: all 0.3s ease;
          transform: translateY(0);
        }
        .hover-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }
        .shadow-lg {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }
        .hero-section {
          background: #4facfe;
          border-radius: 20px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default HomePage;
