import React, { Component } from 'react';
import { ProductSelector } from './../../Components/Order/ProductSelector';
import { OrderDetails } from './../../Components/Order/OrderDetails';
import { Container } from './../../_styles';

export class OrderNew extends Component {
    render() {
        return (
            <Container>
                <ProductSelector />
                <OrderDetails orders="orders" />
            </Container>
        );
    }
}
