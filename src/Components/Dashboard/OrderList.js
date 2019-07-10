import React, { Component } from 'react';
import { database } from './../../firebase';
import { OrderInfo, OrderDetails } from './';
import { Row, Col, Badge } from './../../_styles';
import { CSSOrderHeading2, CSSOrderListing } from './_styles';

export class OrderList extends Component {
    constructor(props) {
        super(props);
        this.ordersRef = database.ref('/orders');
        this.state = {
            isOrderLoaded: false,
            openOrders: 0,
            cancelledOrders: 0,
        };
    }

    createOrderList = (orderList) => {
        let orderListRender = [],
            isCompletedOrder = this.state.cancelledOrders > 0,
            isCompletedOrderHeader = false;
        orderList.forEach((order, idx, arr) => {
            console.log(order.status);
            if (order.status === 'open') {
                if (idx === 0) {
                    orderListRender.push(
                        <CSSOrderHeading2 key={idx}>
                            Open Orders
                            <span>
                                <Badge pill variant="primary">
                                    {this.state.openOrders}
                                </Badge>
                            </span>
                        </CSSOrderHeading2>,
                    );
                }
                orderListRender.push(order.render);
            } else {
                if (isCompletedOrder && !isCompletedOrderHeader) {
                    isCompletedOrderHeader = true;
                    orderListRender.push(
                        <CSSOrderHeading2 key={idx}>
                            Completed Orders
                            <span>
                                <Badge pill variant="primary">
                                    {this.state.cancelledOrders}
                                </Badge>
                            </span>
                        </CSSOrderHeading2>,
                    );
                }
                orderListRender.push(order.render);
            }
        });
        return orderListRender;
    };

    componentDidMount() {
        this.ordersRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let orders = snapshot.val(),
                    orderIds = Object.keys(orders),
                    orderList = [];
                orderIds.forEach((id, idx) => {
                    let orderItem = {};
                    // set order item render
                    orderItem.render = [];
                    // set order item status to sort in dashboard
                    orderItem.status = orders[id].status;
                    // create order item render

                    // count open orders
                    if (orderItem.status === 'open') {
                        this.setState({
                            openOrders: (this.state.openOrders += 1),
                        });
                    }
                    // count closed orders
                    if (orderItem.status === 'cancelled') {
                        this.setState({
                            cancelledOrders: (this.state.cancelledOrders += 1),
                        });
                    }

                    orderItem.render.push(
                        <CSSOrderListing key={idx}>
                            <Col sm={12} md={3}>
                                <OrderInfo oid={id} order={orders[id]} />
                            </Col>
                            <Col sm={12} md={8}>
                                <OrderDetails order={orders[id]} />
                            </Col>
                        </CSSOrderListing>,
                    );
                    // set order item into order list
                    orderList.push(orderItem);
                });

                console.log(orderList);

                // pass createOrderDetails is loaded
                this.setState({
                    isOrderLoaded: true,
                    orderList: orderList,
                });
            } else {
                this.setState({
                    isOrder: false,
                });
            }
        });
    }

    render() {
        if (this.state.isOrderLoaded) {
            return <div>{this.createOrderList(this.state.orderList)}</div>;
        } else if (!this.state.isOrder) {
            return <div>No Data...</div>;
        } else {
            return <div>Loading...</div>;
        }
    }
}
