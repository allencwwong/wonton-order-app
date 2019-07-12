import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { Print, NoPrint } from 'react-easy-print';
import 'react-datepicker/dist/react-datepicker.css';
import {
    ProductOrderPanel,
    OrderDetails as OrderDetailsBlock,
    OrderBar,
    ProductsMenu,
} from './../../Components/Order';
import { Container, Row, Col, Card, Form, Button } from './../../_styles';
import { database } from './../../firebase';
import { Header } from './../../Components/Header';

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
            showProductMeu: false,
            products: null,
            selectedProduct: null,
            selectedPrice: 0,
            selectedQty: 0,
            selectedTotal: 0,
            selectedProductList: {},
            showSubmit: false,
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
            showSubmit: true,
        });
    };

    handleClickEditItem = (pid) => {
        let selectedQty = this.state.order.orderDetails.products[pid].qty;
        this.setState({
            selectedProduct: pid,
            isProductSelected: true,
            selectedQty: selectedQty,
            selectedTotal: this.selectedTotal(
                selectedQty,
                this.state.products[pid].price,
            ),
        });
    };

    handleClickRemoveOrder = (pid) => {
        let order = this.state.order,
            orderDetails = order.orderDetails.products[pid],
            updatedSelectedProductList = this.state.selectedProductList;

        // subtract removed total
        order.orderDetails.total -= this.selectedTotal(
            orderDetails.qty,
            this.state.products[pid].price,
        );

        order.orderDetails.totalQty -= order.orderDetails.products[pid].qty;

        // reset orderDetail
        orderDetails.qty = 0;
        orderDetails.selectedTotal = 0;
        updatedSelectedProductList[pid] = 0;

        this.setState({
            order: order,
            selectedProductList: updatedSelectedProductList,
        });
    };

    handleDateChange = (date) => {
        this.setState({
            dueDate: date,
            showSubmit: true,
        });
    };

    handleClickShowProductMeu = () => {
        this.setState({
            showProductMeu: true,
        });
    };

    handleClickCollapsible = () => {
        this.setState({
            showProductMeu: false,
            isProductSelected: false,
            selectedQty: 0,
        });
    };

    // submit order to fb (update)
    handleClickSubmitOrder = () => {
        console.log(this.state);
        alert('submit edited order');
        let { order, dueDate, buyer, status } = this.state,
            orderIdKey;

        dueDate = this.formatDate(dueDate);
        orderIdKey = window.location.pathname.split('/')[2];

        database
            .ref(`/orders/${orderIdKey}`)
            .update({
                buyer: buyer,
                dueDate: dueDate,
                order: order,
            })
            .then((snapshot) => {
                window.location.reload();
            });
    };

    handleClickCancelOrder = () => {
        let orderIdKey = window.location.pathname.split('/')[2];
        // prompt cancel order
        database
            .ref(`/orders/${orderIdKey}`)
            .update({
                status: 'cancelled',
            })
            .then((snapshot) => {
                this.props.history.push(`/`);
            });
    };

    // helper function
    selectedTotal = (selectedQty, price) => {
        return selectedQty * price;
    };

    formatDate = (date) => {
        let dd = String(date.getDate()).padStart(2, '0'),
            mm = String(date.getMonth() + 1).padStart(2, '0'),
            yyyy = date.getFullYear(),
            formatted = `${mm}/${dd}/${yyyy}`;
        return formatted;
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
                let oid = window.location.pathname.split('/')[2],
                    orders = snapshot.val(),
                    order = orders[oid];

                if (snapshot.exists() && orders[oid]) {
                    this.setState({
                        isProductLoaded: true,
                        products: products,
                        order: order.order,
                        date: order.date,
                        dueDate: new Date(order.dueDate),
                        buyer: order.buyer,
                        status: order.status,
                        oid: order.oid,
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
            console.log(this.state.status);
            return (
                <div>
                    <Container fluid={true}>
                        <Container>
                            <Header />
                        </Container>
                    </Container>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Order Details</h1>
                            </Col>
                        </Row>
                        <Print>
                            <Form>
                                <Row>
                                    <Col>Id: {this.state.oid}</Col>
                                    <Col>
                                        <Form.Group controlId="orderInfoForm-buyer">
                                            <Form.Label>buyer</Form.Label>
                                            {/*
                                        <Form.Control
                                            type="text"
                                            placeholder="buyer"
                                            selected={this.state.buyer}
                                            onChange={this.handleFormBuyerChange}
                                        />
                                    */}
                                            {this.state.buyer}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="orderInfoForm-date">
                                            <Form.Label>Date</Form.Label>
                                            {this.state.date}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="orderInfoForm-duedate">
                                            <Form.Label>Due Date</Form.Label>
                                            <DatePicker
                                                selected={this.state.dueDate}
                                                onChange={this.handleDateChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Print>
                        {this.state.status !== 'cancelled' && (
                            <Row>
                                <Col className="col-1">
                                    <Button
                                        onClick={
                                            this.handleClickShowProductMeu
                                        }>
                                        Add
                                    </Button>
                                </Col>
                                <Col className="col-1">
                                    <Button
                                        className="btn-danger"
                                        onClick={this.handleClickCancelOrder}>
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        )}

                        {this.state.showProductMeu && (
                            <Row>
                                <Col>
                                    <ProductsMenu
                                        products={this.state.products}
                                        selectedProduct={
                                            this.state.selectedProduct
                                        }
                                        isProductSelected={
                                            this.state.isProductSelected
                                        }
                                        click={this.handleClickSelectItem}
                                    />
                                </Col>
                            </Row>
                        )}

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
                                            selectedTotal={
                                                this.state.selectedTotal
                                            }
                                            isProductSelected={
                                                this.state.isProductSelected
                                            }
                                            handleClickCollapsible={
                                                this.handleClickCollapsible
                                            }
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        )}

                        {this.state.order.orderDetails.total > 0 && (
                            <Print>
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
                                                status={this.state.status}
                                            />
                                            {this.state.order.orderDetails
                                                .total > 0 && (
                                                <Card.Footer>
                                                    <Row>
                                                        <Col>
                                                            <OrderBar
                                                                bartype="total"
                                                                showSubmit={
                                                                    this.state
                                                                        .showSubmit
                                                                }
                                                                selectedTotal={
                                                                    this.state
                                                                        .order
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
                            </Print>
                        )}
                    </Container>
                </div>
            );
        } else if (this.state.isLoadingOrder) {
            return <div>Loading...</div>;
        } else {
            return <div>Order Does Not Exist!</div>;
        }
    }
}
