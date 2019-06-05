import React, { Component } from 'react';
import { Row, Col, Button } from './../../_styles';

export class OrderBar extends Component {
    render() {
        let { selectedTotal } = this.props;
        return (
            <Row>
                <Col sm={6} md={8}>
                    <h2>Total: ${selectedTotal}</h2>
                </Col>
                <Col sm={6} md={4}>
                    <Button onClick={() => this.props.handleClickSubmit()}>
                        Submit
                    </Button>
                </Col>
            </Row>
        );
    }
}
