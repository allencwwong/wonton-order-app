import React, { Component } from 'react';
import { Row, Col, InputGroup, Button, Card } from '../../_styles';
import { OrderBar } from './OrderBar';

export class ProductOrderPanel extends Component {
    // get props - name , img , price
    // create qty component
    // pass props.price and qty to OrderBar
    // on OrderBar submit send order data - orderInfo: {buyer, date, grandTotal} orderId: {name , price , qty , total }
    // redirect to dashboard/:id page
    render() {
        const {
            isProductSelected,
            selectedProduct,
            products,
            selectedTotal,
        } = this.props;
        if (isProductSelected) {
            let currProduct = {
                name: products[selectedProduct].name.cn,
                icon: products[selectedProduct].icon,
                price: products[selectedProduct].price,
            };
            return (
                <>
                    <Card.Body>
                        <Row>
                            <Col sm={12} md={4}>
                                <h1>{currProduct.name}</h1>
                                <h2>Id: {selectedProduct}</h2>
                                <h2>{currProduct.icon}</h2>
                                <h2>${currProduct.price}</h2>
                            </Col>
                            <Col sm={12} md={8}>
                                <Row>
                                    <Col>
                                        <h1>qty comp</h1>
                                    </Col>
                                </Row>
                                <InputGroup className="mb-3">
                                    <Row>
                                        <Col>
                                            <InputGroup.Prepend>
                                                <Button
                                                    variant="outline-success"
                                                    onClick={() =>
                                                        this.props.handleClickIncrement()
                                                    }>
                                                    +
                                                </Button>
                                            </InputGroup.Prepend>
                                        </Col>
                                        <Col>
                                            <p>{this.props.selectedQty}</p>
                                        </Col>
                                        <Col>
                                            <InputGroup.Append>
                                                <Button
                                                    variant="outline-danger"
                                                    onClick={() =>
                                                        this.props.handleClickDecrement()
                                                    }>
                                                    -
                                                </Button>
                                            </InputGroup.Append>
                                        </Col>
                                    </Row>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <OrderBar
                            selectedTotal={selectedTotal}
                            handleClickSubmit={this.props.handleClickAddProduct}
                        />
                    </Card.Footer>
                </>
            );
        } else {
            return <div className="d-none">select a product</div>;
        }
    }
}
