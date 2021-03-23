import React from 'react';
import { NavLink } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';

interface IProps {
    content: string
}

const NotFound: React.FC<IProps> = (props: IProps) => {
    const { content } = props;
    return (
        <Row className="rowNotFound">
            <Col className="text-center">
                <h1 className="spanNotFound">[404]</h1>
                <h1>{content} not found</h1>
                <NavLink exact to="/products">
                    <Button className="my-5" variant="outline-info">
                        Back to safety
                    </Button>
                </NavLink>
            </Col>
        </Row>
    )
}

export default NotFound;