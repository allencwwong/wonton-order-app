import React, { Component } from 'react';
import { Row, Col, Card } from './../../_styles';

export class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: this.props.order,
            products: this.props.products,
        };
    }

    render() {
        const { order, products } = this.state;
        let orderItemIds,
            orderDetails,
            orderList = [];

        orderItemIds = Object.keys(order.orderDetails.products);
        orderItemIds.forEach((id) => {
            let orderDetailsPanel = [];
            orderDetailsPanel.push(
                <Card.Header>
                    <Row>
                        <Col xs={3} md={3}>
                            Item
                        </Col>
                        <Col xs={2} md={2}>
                            Qty
                        </Col>
                        <Col xs={3} md={2}>
                            Price
                        </Col>
                        <Col xs={3} md={2}>
                            Total
                        </Col>
                    </Row>
                </Card.Header>,
            );
            if (order.orderDetails.products[id].qty > 0) {
                orderDetails = order.orderDetails.products[id];
                orderDetailsPanel.push(
                    <Card.Body key={id}>
                        <Row>
                            <Col xs={3} md={3}>
                                {products[id].name.cn}
                            </Col>
                            <Col xs={2} md={2}>
                                {orderDetails.qty}
                            </Col>
                            <Col xs={3} md={2}>
                                ${products[id].price}
                            </Col>
                            <Col xs={3} md={2}>
                                ${orderDetails.selectedTotal}
                            </Col>
                            <Col xs={3} md={1}>
                                <a
                                    onClick={() =>
                                        this.props.handleClickEditItem(id)
                                    }>
                                    edit
                                </a>
                            </Col>
                            <Col xs={4} md={1}>
                                <a
                                    onClick={() =>
                                        this.props.handleClickRemoveOrder(id)
                                    }>
                                    remove
                                </a>
                            </Col>
                        </Row>
                    </Card.Body>,
                );
                let orderDetailsPanelCancelled = (
                    <Card.Body key={id}>
                        <Row>
                            <Col>{products[id].name.cn}</Col>
                            <Col>{orderDetails.qty}</Col>
                            <Col>${products[id].price}</Col>
                            <Col>${orderDetails.selectedTotal}</Col>
                        </Row>
                    </Card.Body>
                );
                if (this.props.status !== 'cancelled') {
                    orderList.push(orderDetailsPanel);
                } else {
                    orderList.push(orderDetailsPanelCancelled);
                }
            }
        });

        if (orderList.length > 0) {
            return orderList;
        }
        return null;
    }
}
