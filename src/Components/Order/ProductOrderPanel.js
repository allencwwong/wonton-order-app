import React, { Component } from 'react';
import { Row, Col } from '../../_styles';

export class ProductOrderPanel extends Component {
    // get props - name , img , price
    // create qty component
    // pass props.price and qty to OrderBar
    // on OrderBar submit send order data - orderInfo: {buyer, date, grandTotal} orderId: {name , price , qty , total }
    // redirect to dashboard/:id page
    render() {
        return (
            <Row>
                <Col>
                    <h1>ProductOrderPanel</h1>
                </Col>
            </Row>
        );
    }
}
