import React, { Component } from 'react';
import { OrderList } from './../../Components/Dashboard';

export class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <OrderList />
            </div>
        );
    }
}
