import React from 'react';
import { Row } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

type Product = {
    img: string,
    name: string,
    url: string
}

const Products: React.FC = () => {
    const productArray: Product[] = [
        {
            img: 'http://content.cylindo.com/api/v2/4404/products/ARCHIBALDCHAIR/frames/1/',
            name: 'Archibald Chair',
            url: '/4404/product/ARCHIBALDCHAIR'
        },
        {
            img: 'https://content.cylindo.com/api/v2/4508/products/PAIDGESOFA/frames/1/sofa.jpg%20?size=1024&feature=FABRIC%20COLOR:BLUE&feature=PILLOWS:PILLOWS_1',
            name: 'Paidge Sofa',
            url: '/4508/product/PAIDGESOFA'
        },
        {
            img: 'http://content.cylindo.com/api/v2/4965/products/EMMA_ARMCHAIR/frames/1/',
            name: 'Emma Armchair',
            url: '/4965/product/EMMA_ARMCHAIR'
        }
    ];

    const cards = (arr: Product[]) => 
        arr.map((item: Product) => (
            <ProductCard 
                key={item.url}
                image={item.img}
                name={item.name}
                url={item.url}
            />
        )
    )

    return (
        <Row className="py-4">
            {cards(productArray)}
        </Row>
    )
}

export default Products;