import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="oval-navbar shadow-sm py-3">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center fw-bold fs-3 text-white">
            <img
              src="/assets/img.svg"
              alt="Logo"
              width="40"
              height="40"
              className="me-2"
            />
            Student Management
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 text-white" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-4">
            {['/', '/students', '/add-student'].map((path, idx) => {
              const label = ['Home','Students','Add Student'][idx];
              return (
                <LinkContainer to={path} key={path}>
                  <Nav.Link
                    active={location.pathname === path}
                    className="nav-link-custom"
                  >
                    {label}
                  </Nav.Link>
                </LinkContainer>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style jsx="true">{`
        .oval-navbar {
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
          border-radius: 50px;
          margin: 1rem auto;
          padding: 0.5rem 2rem;
          max-width: 95%;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
          position: sticky;
          top: 10px;
          z-index: 999;
          transition: transform 0.3s;
        }
        .oval-navbar:hover {
          transform: translateY(-2px);
        }
        .nav-link-custom {
          color: #fff !important;
          font-size: 1.1rem;
          font-weight: 500;
          position: relative;
          transition: color 0.3s, transform 0.3s;
        }
        .nav-link-custom.active {
          color:rgb(19, 19, 18) !important;  /* bright accent on active */
        }
        .nav-link-custom.active::after {
          content: '';
          position: absolute;
          width: 50%;
          height: 3px;
          background:rgb(15, 15, 15);
          bottom: -6px;
          left: 25%;
          border-radius: 2px;
        }
        .nav-link-custom:hover {
          color:rgb(15, 15, 14) !important;
          transform: scale(1.05);
        }
      `}</style>
    </Navbar>
  );
};

export default Header;
