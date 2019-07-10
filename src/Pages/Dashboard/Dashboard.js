import React, { Component } from 'react';
import { OrderList } from './../../Components/Dashboard';
import { Header } from './../../Components/Header';
import { Container, Row, Col } from './../../_styles';
import { CSSDashboard, CSSDashboardHeader } from './_styles';

export class Dashboard extends Component {
    render() {
        return (
            <CSSDashboard>
                <Container fluid={true}>
                    <Container>
                        <Header />
                    </Container>
                </Container>
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
                    <OrderList />
                </Container>
            </CSSDashboard>
        );
    }
}
