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

        orderItemIds = Object.keys(order.orderDetails);
        orderItemIds.forEach((id) => {
            if (order.orderDetails[id].qty > 0) {
                orderDetails = order.orderDetails[id];
                orderList.push(
                    <Card body key={id}>
                        <Row>
                            <Col>{products[id].name.cn}</Col>
                            <Col>{orderDetails.qty}</Col>
                            <Col>${products[id].price}</Col>
                            <Col>${orderDetails.selectedTotal}</Col>
                            <Col xs={1}>
                                <a>edit</a>
                            </Col>
                            <Col xs={1}>
                                <a
                                    onClick={() =>
                                        this.props.handleClickRemoveOrder(id)
                                    }>
                                    remove
                                </a>
                            </Col>
                        </Row>
                    </Card>,
                );
            }
        });

        console.log(this.state.order);

        if (orderList.length > 0) {
            console.log(orderList);
            return orderList;
        }
        return null;
    }
}
