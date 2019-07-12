import React, { Component } from 'react';
import { Row, Col, Card, ListGroup } from './../../_styles';
import { CSSOrderInfoBtn, CSSOrderInfoCard } from './_styles';

export class OrderInfo extends Component {
    render() {
        const { order, oid } = this.props;
        return (
            <CSSOrderInfoCard>
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Order date: {order.date}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={12} lg={4}>
                                        Id: {order.oid}
                                    </Col>
                                    <Col md={12} lg={8}>
                                        Buyer: {order.buyer}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Due date: {order.dueDate}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                        {this.props.order.status === 'open' && (
                            <Row noGutters>
                                <CSSOrderInfoBtn>
                                    <a
                                        href={'/order/' + this.props.oid}
                                        className="btn btn-primary">
                                        Edit
                                    </a>
                                    <a href="#" className="btn btn-danger">
                                        Remove
                                    </a>
                                </CSSOrderInfoBtn>
                            </Row>
                        )}
                    </Card.Footer>
                </Card>
            </CSSOrderInfoCard>
        );
    }
}
