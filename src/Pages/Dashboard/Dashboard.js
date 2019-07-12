import React, { Component } from 'react';
import { database } from './../../firebase';
import { OrderList } from './../../Components/Dashboard';
import { Remove } from './../../Components/Confirmation';
import { Container, Row, Col, Badge } from './../../_styles';
import { CSSDashboard, CSSDashboardHeader, CSSOrderHeading2 } from './_styles';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.ordersRef = database.ref('/orders');
        this.state = {
            isOrderLoaded: false,
            showRemoveWarning: false,
            openOrders: 0,
            cancelledOrders: 0,
        };
    }

    handleClickRemoveWarning = () => {
        this.setState({
            showRemoveWarning: true,
        });
    };

    componentDidMount() {
        this.ordersRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let orders = snapshot.val(),
                    orderIds = Object.keys(orders);

                orderIds.forEach((id, idx) => {
                    // set order item status to sort in dashboard
                    let orderStatus = orders[id].status;

                    // count open orders
                    if (orderStatus === 'open') {
                        this.setState({
                            openOrders: (this.state.openOrders += 1),
                        });
                    }
                    // count closed orders
                    if (orderStatus === 'cancelled') {
                        this.setState({
                            cancelledOrders: (this.state.cancelledOrders += 1),
                        });
                    }

                    // pass createOrderDetails is loaded
                    this.setState({
                        isOrderLoaded: true,
                    });
                });
            }
        });
    }

    render() {
        return (
            <CSSDashboard>
                <Remove />
                <Container>
                    <CSSDashboardHeader>
                        <Row>
                            <Col>
                                <h1>Dashboard</h1>
                                <a
                                    href="/createorder"
                                    className="btn btn-primary">
                                    Add
                                </a>
                            </Col>
                        </Row>
                    </CSSDashboardHeader>
                    <CSSOrderHeading2>
                        Open Orders
                        <Badge pill variant="primary">
                            {this.state.openOrders}
                        </Badge>
                    </CSSOrderHeading2>
                    <OrderList status="open" />
                    <CSSOrderHeading2>
                        Completed Orders
                        <Badge pill variant="primary">
                            {this.state.cancelledOrders}
                        </Badge>
                    </CSSOrderHeading2>
                    <OrderList status="cancelled" />
                </Container>
            </CSSDashboard>
        );
    }
}
