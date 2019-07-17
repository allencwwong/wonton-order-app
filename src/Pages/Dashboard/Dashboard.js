import React, { Component } from 'react';
import { database } from './../../firebase';
import { OrderList } from './../../Components/Dashboard';
import { Remove } from './../../Components/Confirmation';
import { Container, Row, Col, Badge, Card } from './../../_styles';
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
            oid: null,
        };
    }

    handleClickRemoveWarning = (oid) => {
        this.setState({
            showRemoveWarning: true,
            oid: oid,
        });
    };

    handleClickRemoveWarningClose = (oid) => {
        this.setState({
            showRemoveWarning: false,
        });
    };

    handleClickRemoveOrder = () => {
        console.log('removed order');
        // remove order for db
        // let openOrders = this.state.openOrders - 1,
        //     cancelledOrders = this.state.cancelledOrders + 1;
        this.setState({
            showRemoveWarning: false,
            oid: null,
        });
        database.ref(`/orders/${this.state.oid}`).update({
            status: 'cancelled',
        });
        // console.log(openOrders);
        // console.log(cancelledOrders);

        console.log(this.state.openOrders);
        console.log(this.state.cancelledOrders);
    };

    componentDidMount() {
        this.ordersRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let orders = snapshot.val(),
                    orderIds = Object.keys(orders),
                    openOrders = 0,
                    cancelledOrders = 0,
                    completedOrders = 0;

                orderIds.forEach((id, idx) => {
                    // set order item status to sort in dashboard
                    let orderStatus = orders[id].status;

                    // count open orders
                    if (orderStatus === 'open') {
                        this.setState({
                            openOrders: (openOrders += 1),
                        });
                    }
                    if (orderStatus === 'completed') {
                        this.setState({
                            completedOrders: (completedOrders += 1),
                        });
                    }
                    // count closed orders
                    if (orderStatus === 'cancelled') {
                        this.setState({
                            cancelledOrders: (cancelledOrders += 1),
                        });
                    }

                    // pass createOrderDetails is loaded
                    this.setState({
                        isOrderLoaded: true,
                    });
                });
                if (openOrders === 0) {
                    this.setState({
                        openOrders: 0,
                    });
                }
                if (completedOrders === 0) {
                    this.setState({
                        completedOrders: 0,
                    });
                }
                if (cancelledOrders === 0) {
                    this.setState({
                        cancelledOrders: 0,
                    });
                }
                this.setState({
                    orders: orders,
                });
            }
        });
    }

    render() {
        return (
            <CSSDashboard>
                {this.state.showRemoveWarning && (
                    <Remove
                        handleClickRemoveWarningClose={
                            this.handleClickRemoveWarningClose
                        }
                        handleClickRemoveOrder={this.handleClickRemoveOrder}
                        oid={this.state.oid}
                        order={this.state.orders[this.state.oid]}
                    />
                )}
                <Container>
                    <CSSDashboardHeader>
                        <Row>
                            <Col>
                                <h1>仪表板</h1>
                                <a
                                    href="/createorder"
                                    className="btn btn-primary">
                                    新订单
                                </a>
                            </Col>
                        </Row>
                    </CSSDashboardHeader>
                    <CSSOrderHeading2>
                        未结订单
                        <Badge pill variant="primary">
                            {this.state.openOrders}
                        </Badge>
                    </CSSOrderHeading2>
                    <OrderList
                        status="open"
                        handleClickRemoveWarning={this.handleClickRemoveWarning}
                    />
                    <CSSOrderHeading2>
                        完成订单
                        <Badge pill variant="primary">
                            {this.state.completedOrders}
                        </Badge>
                    </CSSOrderHeading2>
                    {this.state.completedOrders === 0 ? (
                        <Card body>没有数据</Card>
                    ) : (
                        <OrderList
                            status="completed"
                            handleClickRemoveWarning={
                                this.handleClickRemoveWarning
                            }
                        />
                    )}

                    <CSSOrderHeading2>
                        取消订单
                        <Badge pill variant="primary">
                            {this.state.cancelledOrders}
                        </Badge>
                    </CSSOrderHeading2>
                    <OrderList
                        status="cancelled"
                        handleClickRemoveWarning={this.handleClickRemoveWarning}
                    />
                </Container>
            </CSSDashboard>
        );
    }
}
