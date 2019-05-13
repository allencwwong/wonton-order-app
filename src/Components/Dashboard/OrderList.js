import React, { Component } from 'react';
import { OrderInfo } from './';

export class OrderList extends Component {
    render() {
        return (
            <div>
                <h1>OrderList</h1>
                <OrderInfo />
            </div>
        );
    }
}
