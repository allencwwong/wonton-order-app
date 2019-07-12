import React, { Component } from 'react';
import { Row, Col, Badge } from '../../_styles';
import { CSSHeader, CSSBackToDash } from './_styles';

export class Header extends Component {
    render() {
        return (
            <CSSHeader>
                <Col>
                    <CSSBackToDash href="/">
                        <Badge variant="secondary">
                            <p>
                                <i className="far fa-chevron-left" />
                                Arrows Back to Dashboard
                            </p>
                        </Badge>
                    </CSSBackToDash>
                </Col>
            </CSSHeader>
        );
    }
}
