import React, { Component } from 'react';
import { OrderList } from './../../Components/Dashboard';
import { Header } from './../../Components/Header';
import { Container, Row, Col } from './../../_styles';

export class Dashboard extends Component {
    render() {
        return (
            <div>
                <Container fluid={true}>
                    <Container>
                        <Header />
                    </Container>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <h1>Dashboard</h1>
                        </Col>
                    </Row>
                    <OrderList />
                </Container>
            </div>
        );
    }
}
