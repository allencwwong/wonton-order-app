import React, { Component } from 'react';
import { Row, Col, Card, Button } from '../../_styles';
import { CSSRemove, CSSOverlay } from './_styles';
import { OrderDetails } from '../../Components/Dashboard/OrderDetails';

export class Remove extends Component {
    render() {
        return (
            <>
                <CSSRemove>
                    <Card>
                        <Card.Header>
                            Are you want to cancel order?{' '}
                            <strong>Id No: {this.props.order.oid}</strong>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Row>
                                        <OrderDetails
                                            oid={this.props.oid}
                                            order={this.props.order}
                                        />
                                    </Row>
                                </Col>
                                <Col sm={12}>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() =>
                                            this.props.handleClickRemoveWarningClose()
                                        }>
                                        close
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() =>
                                            this.props.handleClickRemoveOrder()
                                        }>
                                        cancel order
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </CSSRemove>
                <CSSOverlay />
            </>
        );
    }
}
