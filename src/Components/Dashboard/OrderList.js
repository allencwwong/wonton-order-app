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
                orderList.push(<OrderDetails order={orders[id]} />);
            });

            // pass createOrderList is loaded
            this.setState({
                isOrderLoaded: true,
                orderList: orderList,
            });
        });
    }

    render() {
        if (this.state.isOrderLoaded) {
            return (
                <Row>
                    <Col sm={12}>
                        <h1>OrderList</h1>
                    </Col>
                    <Col sm={3}>
                        <OrderInfo />
                    </Col>
                    <Col sm={9}>{this.state.orderList}</Col>
                </Row>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}
