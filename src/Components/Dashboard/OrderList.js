import React, { Component } from 'react';
import { database } from './../../firebase';
import { OrderInfo, OrderDetails } from './';
import { Row, Col, Badge } from './../../_styles';

export class OrderList extends Component {
    constructor(props) {
        super(props);
        this.ordersRef = database.ref('/orders');
        this.state = {
            isOrderLoaded: false,
        };
    }

    createOrderList = (orderList) => {
        let orderListRender = [];
        orderList.forEach((order, idx, arr) => {
            if (order.status === 'active') {
                if (idx === 0) {
                    orderListRender.push(
                        <h2>
                            Active Orders
                            <span>
                                <Badge pill variant="primary">
                                    {arr.length}
                                </Badge>
                            </span>
                        </h2>,
                    );
                }
                orderListRender.push(order.render);
            } else {
                if (idx === arr.length - 1) {
                    orderListRender.push(<h1>Completed Orders</h1>);
                }
                orderListRender.push(order.render);
            }
        });
        return orderListRender;
    };

    componentDidMount() {
        console.log(this.ordersRef);
        this.ordersRef.on('value', (snapshot) => {
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
                orderItem.render.push(
                    <Row key={idx}>
                        <Col sm={12} md={3}>
                            <OrderInfo />
                        </Col>
                        <Col sm={12} md={8}>
                            <OrderDetails order={orders[id]} />
                        </Col>
                    </Row>,
                );
                // set order item into order list
                orderList.push(orderItem);
            });

            // pass createOrderDetails is loaded
            this.setState({
                isOrderLoaded: true,
                orderList: orderList,
            });
        });
    }

    render() {
        if (this.state.isOrderLoaded) {
            return <div>{this.createOrderList(this.state.orderList)}</div>;
        } else {
            return <div>Loading...</div>;
        }
    }
}
