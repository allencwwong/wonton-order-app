import React, { Component } from 'react';
import {
    ProductOrderPanel,
    OrderDetails as OrderDetailsBlock,
    OrderBar,
} from './../../Components/Order';
import { Container, Row, Col, Card } from './../../_styles';
import { database } from './../../firebase';

export class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.productRef = database.ref('/products');
        this.ordersRef = database.ref('/orders');
        this.orderCountRef = database.ref('/ordercount');
        this.state = {
            isLoadingOrder: true,
            isProductLoaded: false,
            isProductSelected: false,
            products: null,
            selectedProduct: null,
            selectedPrice: 0,
            selectedQty: 0,
            selectedTotal: 0,
            selectedProductList: {},
            buyer: '',
            date: '',
            status: 'open',
            oid: 0,
            order: {
                isOrder: false,
                buyer: '',
                date: '',
                orderDetails: {
                    total: 0,
                    totalQty: 0,
                    products: {
                        wt: {
                            qty: 0,
                        },
                        ps: {
                            qty: 0,
                        },
                        dhk: {
                            qty: 0,
                        },
                        dce: {
                            qty: 0,
                        },
                    },
                },
            },
        };
    }

    handleClickSelectItem = (e) => {
        let selectedProduct = e.currentTarget.getAttribute('data-pid'),
            selectedQty = this.state.order.orderDetails.products[
                selectedProduct
            ].qty,
            selectedTotal = this.selectedTotal(
                selectedQty,
                this.state.products[selectedProduct].price,
            );

        if (selectedProduct !== this.state.selectedProduct) {
            this.setState({
                isProductSelected: true,
                selectedProduct: selectedProduct,
                selectedQty: selectedQty,
                selectedTotal: selectedTotal,
            });
        } else if (selectedProduct === this.state.selectedProduct) {
            this.setState({
                isProductSelected: false,
                selectedProduct: null,
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
            orderDetails = order.orderDetails.products[selectedProduct],
            allOrderDetails = order.orderDetails.products,
            total = 0,
            totalQty = 0,
            orderDetailsId;
        // set order
        orderDetails.qty = selectedQty;
        orderDetails.selectedTotal = this.state.selectedTotal;
        // calc total
        orderDetailsId = Object.keys(allOrderDetails);
        orderDetailsId.forEach((id) => {
            if (allOrderDetails[id].qty > 0) {
                totalQty += allOrderDetails[id].qty;
                total += this.selectedTotal(
                    allOrderDetails[id].qty,
                    this.state.products[id].price,
                );
            }
        });

        order.orderDetails.total = total;
        order.orderDetails.totalQty = totalQty;

        // keep track of selected product(s) for edit propose
        var updatedSelectedProductList = this.state.selectedProductList;
        updatedSelectedProductList[selectedProduct] = 1;

        this.setState({
            order: order,
            selectedProduct: null,
            isProductSelected: false,
            selectedProductList: updatedSelectedProductList,
        });

        console.log('submitted order:');
        console.log(this.state.order);
    };

    handleClickEditItem = (pid) => {
        console.log('selected edit');
        this.setState({
            selectedProduct: pid,
            isProductSelected: true,
        });
    };

    handleClickRemoveOrder = (pid) => {
        let order = this.state.order,
            orderDetails = order.orderDetails.products[pid],
            updatedSelectedProductList = this.state.selectedProductList;

        // subtract removed total
        order.orderDetails.total -= this.selectedTotal(
            order.orderDetails.products[pid].qty,
            this.state.products[pid].price,
        );

        // reset orderDetail
        orderDetails.qty = 0;
        orderDetails.selectedTotal = 0;
        updatedSelectedProductList[pid] = 0;

        this.setState({
            order: order,
            selectedProductList: updatedSelectedProductList,
        });
    };

    // helper function
    selectedTotal = (selectedQty, price) => {
        return selectedQty * price;
    };

    componentDidMount() {
        this.orderCountRef.on('value', (snapshot) => {
            this.setState({
                oid: snapshot.val(),
            });
        });
        this.productRef.on('value', (snapshot) => {
            let products = snapshot.val();
            this.ordersRef.on('value', (snapshot) => {
                let orders = snapshot.val(),
                    oid = window.location.pathname.split('/')[2];
                if (snapshot.exists() && orders[oid]) {
                    this.setState({
                        isProductLoaded: true,
                        products: products,
                        order: orders[oid].order,
                    });
                } else {
                    this.setState({
                        isLoadingOrder: false,
                    });
                }
            });
        });
    }

    render() {
        if (this.state.isProductLoaded) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <h1>Order Details</h1>
                        </Col>
                    </Row>
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
                                    <OrderDetailsBlock
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
                                                            false
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
        } else if (this.state.isLoadingOrder) {
            return <div>Loading...</div>;
        } else {
            return <div>Order Does Not Exist!</div>;
        }
    }
}
