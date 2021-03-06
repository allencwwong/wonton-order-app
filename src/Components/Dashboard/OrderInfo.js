import React, { Component } from 'react';
import { Row, Col, Card, ListGroup } from './../../_styles';
import { CSSOrderInfoBtn, CSSOrderInfoCard } from './_styles';
import { OrderDetails } from '../../Components/Dashboard/OrderDetails';

export class OrderInfo extends Component {
    render() {
        const { order, oid } = this.props;
        return (
            <CSSOrderInfoCard>
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                交货日期: {order.date}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={12} lg={4}>
                                        Id: {order.oid}
                                    </Col>
                                    <Col md={12} lg={8}>
                                        买主: {order.buyer}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                交货日期: {order.dueDate}
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
                                        编辑
                                    </a>
                                    <a
                                        href="#"
                                        className="btn btn-danger"
                                        onClick={() =>
                                            this.props.handleClickRemoveWarning(
                                                this.props.oid,
                                            )
                                        }>
                                        消除
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
