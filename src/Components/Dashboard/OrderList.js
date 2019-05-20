import React, { Component } from 'react';
import { database } from './../../firebase';
import { OrderInfo, OrderDetails } from './';
import { Row, Col } from './../../_styles';

export class OrderList extends Component {
    constructor(props) {
        super(props);
        this.ordersRef = database.ref('/orders');
        this.state = {
            isOrderLoaded: false,
        };
    }

    componentDidMount() {
        console.log(this.ordersRef);
        this.ordersRef.on('value', (snapshot) => {
            let orders = snapshot.val(),
                orderIds = Object.keys(orders),
                orderList = [];

            orderIds.forEach((id) => {
                orderList.push(
                    <Row>
                        <Col sm={12} md={3}>
                            <OrderInfo />
                        </Col>
                        <Col sm={12} md={8}>
                            <OrderDetails order={orders[id]} />
                        </Col>
                    </Row>,
                );
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
            return (
                <div>
                    <Row>
                        <Col sm={12}>
                            <h1>OrderList</h1>
                        </Col>
                    </Row>
                    {this.state.orderList}
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}
