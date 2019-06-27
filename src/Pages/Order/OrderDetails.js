import React, { Component } from 'react';
import {
    ProductOrderPanel,
    OrderDetails as OrderDetailsBlock,
    ProductsMenu,
    OrderBar,
} from './../../Components/Order';
import { Container, Row, Col, Card } from './../../_styles';
import { database } from './../../firebase';

export class OrderDetails extends Component {
    // load products
    // loop thru products to create selector menu component with associate id
    // based on id render selector panel => pass in props info - name , img , price
    constructor(props) {
        super(props);
        this.productRef = database.ref('/products');
        this.orderRef = database.ref('/orders');
        this.state = {
            isEdit: false,
            isProductLoaded: false,
            selectedProduct: null,
            isProductSelected: false,
        };
    }

    handleClickSelectItem = (e) => {
        let selectedProduct = e.currentTarget.getAttribute('data-pid');

        if (selectedProduct !== this.state.selectedProduct) {
            this.setState({
                isProductSelected: true,
                selectedProduct: selectedProduct,
                selectedQty: 0,
                selectedTotal: 0,
            });
        }
    };

    handleClickIncrement = () => {
        let selectedQty = this.state.selectedQty + 1,
            order = this.state.order;

        order.isOrder = true;

        this.setState({
            selectedQty: selectedQty,
            selectedTotal: this.selectedTotal(
                selectedQty,
                this.state.products[this.state.selectedProduct].price,
            ),
            order: order,
        });
    };

    handleClickDecrement = () => {
        let selectedQty = this.state.selectedQty - 1,
            order = this.state.order;
        // reset to zero - no order
        if (selectedQty === 0) {
            order.isOrder = false;
            this.setState({
                selectedQty: 0,
                selectedTotal: 0,
                order: order,
            });
        }
        if (this.state.selectedQty > 0) {
            this.setState({
                selectedQty: selectedQty,
                selectedTotal: this.selectedTotal(
                    selectedQty,
                    this.state.products[this.state.selectedProduct].price,
                ),
            });
        }
    };

    handleClickAddProduct = () => {
        const { selectedQty, selectedProduct } = this.state;
        let order = this.state.order,
            orderDetails = order.orderDetails[selectedProduct],
            allOrderDetails = order.orderDetails,
            total = 0,
            orderDetailsId;
        // set order
        orderDetails.qty = selectedQty;
        orderDetails.selectedTotal = this.state.selectedTotal;
        // calc total
        orderDetailsId = Object.keys(allOrderDetails);
        orderDetailsId.forEach((id) => {
            if (allOrderDetails[id].qty > 0) {
                total += this.selectedTotal(
                    allOrderDetails[id].qty,
                    this.state.products[id].price,
                );
            }
        });

        this.setState({
            order: order,
            selectedProduct: null,
            isProductSelected: false,
            total: total,
        });
    };

    handleClickRemoveOrder = (pid) => {
        let order = this.state.order,
            orderDetails = order.orderDetails[pid];
        orderDetails.qty = 0;
        orderDetails.selectedTotal = 0;
        this.setState({
            order: order,
        });
    };

    handleClickUpdateOrder = () => {
        // push order to db
        alert('data submitted');
        // redirect to order details page
    };

    // helper function
    selectedTotal = (selectedQty, price) => {
        return selectedQty * price;
    };

    componentDidMount() {
        this.productRef.on('value', (snapshot) => {
            let products = snapshot.val();
            this.orderRef.on('value', (snapshot) => {
                const orders = snapshot.val(),
                    oid = window.location.pathname.split('/')[2];

                this.setState({
                    isProductLoaded: true,
                    products: products,
                    order: orders[oid],
                });
            });
        });
    }

    render() {
        if (this.state.isProductLoaded) {
            return (
                <Container>
                    {this.state.isProductSelected && (
                        <Row>
                            <Col className="my-3">
                                <Card>
                                    <ProductOrderPanel
                                        selectedProduct={
                                            this.state.selectedProduct
                                        }
                                        products={this.state.products}
                                        selectedQty={this.state.selectedQty}
                                        handleClickIncrement={
                                            this.handleClickIncrement
                                        }
                                        handleClickDecrement={
                                            this.handleClickDecrement
                                        }
                                        handleClickAddProduct={
                                            this.handleClickAddProduct
                                        }
                                        order={this.state.order}
                                        selectedTotal={this.state.selectedTotal}
                                        isProductSelected={
                                            this.state.isProductSelected
                                        }
                                    />
                                </Card>
                            </Col>
                        </Row>
                    )}

                    {this.state.order.orderDetails.total > 0 && (
                        <Row>
                            <Col sm={12}>
                                <Card className="mt-3">
                                    <OrderDetails
                                        order={this.state.order}
                                        products={this.state.products}
                                        handleClickRemoveOrder={
                                            this.handleClickRemoveOrder
                                        }
                                        handleClickEditItem={
                                            this.handleClickEditItem
                                        }
                                    />
                                    {this.state.order.orderDetails.total >
                                        0 && (
                                        <Card.Footer>
                                            <Row>
                                                <Col>
                                                    <OrderBar
                                                        bartype="total"
                                                        selectedTotal={
                                                            this.state.order
                                                                .orderDetails
                                                                .total
                                                        }
                                                        handleClickSubmit={
                                                            this
                                                                .handleClickSubmitOrder
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Container>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}
