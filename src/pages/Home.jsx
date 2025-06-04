import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home = ({ isAuthenticated }) => {
  const { t } = useTranslation();

  return (
    <Container className="home-container">
      <Row className="mb-5 hero-section">
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h1 className="display-4 fw-bold">Empowering Seniors to Live Independently</h1>
          <p className="lead">
            A comprehensive platform connecting seniors with family members and volunteers for daily assistance.
          </p>
          {!isAuthenticated && (
            <div className="mt-4">
              <Link to="/register">
                <Button variant="primary" size="lg" className="me-3">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-primary" size="lg">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </Col>
        <Col md={6}>
          <img 
            src="/images/seniors-hero.jpg" 
            alt="Seniors enjoying life" 
            className="img-fluid rounded hero-image"
          />
        </Col>
      </Row>

      <h2 className="text-center mb-4">Our Features</h2>
      
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 feature-card">
            <Card.Body>
              <div className="feature-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <Card.Title>Task Management</Card.Title>
              <Card.Text>
                Create and assign tasks to family members or volunteers.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 feature-card">
            <Card.Body>
              <div className="feature-icon">
                <i className="fas fa-pills"></i>
              </div>
              <Card.Title>Medication Reminders</Card.Title>
              <Card.Text>
                Never miss important medications with timely reminders.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 feature-card">
            <Card.Body>
              <div className="feature-icon">
                <i className="fas fa-shopping-basket"></i>
              </div>
              <Card.Title>Grocery Lists</Card.Title>
              <Card.Text>
                Manage grocery needs and share lists with helpers.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* New Features Section */}
      <h2 className="text-center mb-4">New Features</h2>
      
      <Row className="g-4 mb-5">
        <Col md={3}>
          <Card className="h-100 feature-card new-feature">
            <Card.Body>
              <div className="feature-icon">
                <i className="fas fa-microphone"></i>
              </div>
              <Card.Title>Voice Commands</Card.Title>
              <Card.Text>
                Create tasks using your voice - no typing needed!
              </Card.Text>
              {isAuthenticated && (
                <Link to="/voice-tasks">
                  <Button variant="outline-primary" size="sm">Try it now</Button>
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 feature-card new-feature">
            <Card.Body>
              <div className="feature-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <Card.Title>Location Check-ins</Card.Title>
              <Card.Text>
                Automatically check in at important locations.
              </Card.Text>
              {isAuthenticated && (
                <Link to="/location-check-in">
                  <Button variant="outline-primary" size="sm">Check in now</Button>
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 feature-card new-feature">
            <Card.Body>
              <div className="feature-icon">
                <i className="fas fa-language"></i>
              </div>
              <Card.Title>Multi-Language</Card.Title>
              <Card.Text>
                Use the app in your preferred language.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 feature-card new-feature">
            <Card.Body>
              <div className="feature-icon">
                <i className="fas fa-star"></i>
              </div>
              <Card.Title>Volunteer Ratings</Card.Title>
              <Card.Text>
                Rate and review volunteers who help you.
              </Card.Text>
              {isAuthenticated && (
                <Link to="/volunteer-ratings">
                  <Button variant="outline-primary" size="sm">Rate volunteers</Button>
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5 testimonial-section">
        <Col md={12} className="text-center">
          <h2 className="mb-4">What Our Users Say</h2>
        </Col>
        <Col md={4}>
          <Card className="testimonial-card">
            <Card.Body>
              <p className="testimonial-text">
                "Senior Assist has made it so much easier to coordinate care for my mother. The medication reminders are a lifesaver!"
              </p>
              <p className="testimonial-author">- Maria J., Caregiver</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="testimonial-card">
            <Card.Body>
              <p className="testimonial-text">
                "I love the voice commands feature! At my age, typing can be difficult, but speaking is so natural."
              </p>
              <p className="testimonial-author">- Robert S., Senior</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="testimonial-card">
            <Card.Body>
              <p className="testimonial-text">
                "As a volunteer, the rating system helps me improve my service. The location check-ins also help me know when seniors need assistance."
              </p>
              <p className="testimonial-author">- David L., Volunteer</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;