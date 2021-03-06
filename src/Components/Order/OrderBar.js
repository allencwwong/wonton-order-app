import React, { Component } from 'react';
import { Row, Col, Button } from './../../_styles';
import { CSSOrderBar } from './_styles';

export class OrderBar extends Component {
    render() {
        let { selectedTotal } = this.props;
        console.log(this.props.showSubmit);
        return (
            <CSSOrderBar bartype={this.props.bartype}>
                <Col sm={6} md={8}>
                    <h2>Total: ${selectedTotal}</h2>
                </Col>
                {(this.props.bartype !== 'total' ||
                    (this.props.bartype === 'total' &&
                        this.props.showSubmit)) && (
                    <Col sm={3} md={2}>
                        <Button onClick={() => this.props.handleClickSubmit()}>
                            Submit
                        </Button>
                    </Col>
                )}

                {this.props.isCollapsible && (
                    <Col sm={3} md={2}>
                        <Button
                            onClick={() => this.props.handleClickCollapsible()}>
                            Close
                        </Button>
                    </Col>
                )}
            </CSSOrderBar>
        );
    }
}
