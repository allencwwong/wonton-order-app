import React, { Component } from 'react';
import { Row, Col, Card } from '../../_styles';
import { CSSRemove } from './_styles';

export class Remove extends Component {
    render() {
        return (
            <CSSRemove>
                <Card.Header>Are you want to cancel order?</Card.Header>
                <Card.Body>
                    <Row>
                        <Col sm={6}>cancel order</Col>
                        <Col sm={6}>close</Col>
                    </Row>
                </Card.Body>
            </CSSRemove>
        );
    }
}
