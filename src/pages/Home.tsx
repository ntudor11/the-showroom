import React from 'react';
import { NavLink } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

const Home: React.FC = () => {
    return (
        <Row id="hero">
            <Col className="heroCol">
                <h1 className="heroHeading text-center">Welcome Home.</h1>
                <NavLink exact to="/products" className="ctaButtonContainer">
                    <Button
                        size="lg"
                        variant="outline-light"
                        className="ctaButton"
                    >
                        VISIT SHOWROOM
                    </Button>
                </NavLink>
            </Col>
        </Row>
    );
}

export default Home;