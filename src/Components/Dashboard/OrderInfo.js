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
                        <a
                            href={'/order/' + this.props.oid}
                            className="btn btn-primary">
                            Edit
                        </a>
                    </Col>
                </Row>
            </div>
        );
    }
}
