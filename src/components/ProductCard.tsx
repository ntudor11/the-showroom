import React from 'react';
import { NavLink } from "react-router-dom";
import { Col, Card } from 'react-bootstrap';

interface IProps {
    image: string,
    name: string,
    url: string,
}

const ProductCard: React.FC<IProps> = (props: IProps) => {
    const { url, image, name } = props;
    return (
        <Col sm={12} md={6} lg={4}>
            <NavLink exact activeClassName="active" to={url} className="nav-link">
                <Card className="productCard">
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title className="text-center">{name}</Card.Title>
                    </Card.Body>
                </Card>
            </NavLink>
        </Col>
    )
}

export default ProductCard;