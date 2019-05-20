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
                        <Col xs={6} sm={3}>
                            <h1>Dashboard</h1>
                        </Col>
                        <Col xs={6} sm={9}>
                            <div className="btn btn-primary">Add</div>
                        </Col>
                    </Row>
                    <OrderList />
                </Container>
            </div>
        );
    }
}
