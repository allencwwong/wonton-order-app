import React, { Component } from 'react';
import { database } from './../../firebase';
import { Row, Col, Table } from './../../_styles';

export class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.productRef = database.ref('/products');
        this.state = {
            isProductLoaded: false,
        };
    }

    componentDidMount() {
        this.productRef.on('value', (snapshot) => {
            const { orderDetails } = this.props.order.order;

            let products = snapshot.val(),
                orderItemIds = Object.keys(orderDetails.products),
                orderItems = [];

            orderItemIds.forEach((id, idx, arr) => {
                console.log('id', id);
                console.log('pid', products[id].name.cn);
                let name = products[id].name.cn,
                    price = products[id].price;

                if (orderDetails.products[id].qty > 0) {
                    orderItems.push(
                        <tr key={idx}>
                            <td>{name}</td>
                            <td>{price}</td>
                            <td>{orderDetails.products[id].qty}</td>
                            <td>{orderDetails.products[id].total}</td>
                        </tr>,
                    );
                }
            });

            this.setState({
                isProductLoaded: true,
                orderItems: orderItems,
            });
        });
    }

    render() {
        const { order } = this.props.order;
        if (this.state.isProductLoaded) {
            return (
                <Table className="order-details" responsive hover size="sm">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                        {this.state.orderItems}
                    </tbody>
                </Table>
            );
        } else {
            return <div>Loading info...</div>;
        }
    }
}
