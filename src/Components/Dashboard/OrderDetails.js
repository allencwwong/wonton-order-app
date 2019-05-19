import React, { Component } from 'react';
import { database } from './../../firebase';
import { Row, Col } from './../../_styles';

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
            const { order } = this.props.order;
            let products = snapshot.val(),
                orderItemIds = Object.keys(order),
                orderItems = [];

            orderItemIds.forEach((id) => {
                let name = products[id].name.cn,
                    price = products[id].price;
                orderItems.push(
                    <Col sm={12}>
                        name:{name} price:{price}
                    </Col>,
                );
            });

            console.log(products);
            this.setState({
                isProductLoaded: true,
                orderItems: orderItems,
            });
        });
    }

    render() {
        const { order } = this.props.order;
        console.log(this.props);
        if (this.state.isProductLoaded) {
            return <Row>{this.state.orderItems}</Row>;
        } else {
            return <div>Loading info...</div>;
        }
    }
}
