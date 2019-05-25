import React, { Component } from 'react';
import { Row, Col } from './../../_styles';

export class OrderInfo extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h1>OrderInfo</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className="btn btn-primary">Edit</button>
                    </Col>
                </Row>
            </div>
        );
    }
}
