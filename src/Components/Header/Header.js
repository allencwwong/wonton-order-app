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
                                回到仪表板
                            </p>
                        </Badge>
                    </CSSBackToDash>
                </Col>
            </CSSHeader>
        );
    }
}
