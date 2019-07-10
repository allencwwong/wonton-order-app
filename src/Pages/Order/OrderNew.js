import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    ProductOrderPanel,
    OrderDetails,
    ProductsMenu,
    OrderBar,
} from './../../Components/Order';
import { Container, Row, Col, Card, Form } from './../../_styles';
import { database } from './../../firebase';
import { Header } from './../../Components';

export class OrderNew extends Component {
    // load products
    // loop thru products to create selector menu component with associate id
    // based on id render selector panel => pass in props info - name , img , price
    constructor(props) {
        super(props);
        this.productRef = database.ref('/products');
        this.ordersRef = database.ref('/orders');
        this.orderCountRef = database.ref('/ordercount');
        this.state = {
            isProductLoaded: false,
            isProductSelected: true,
            products: null,
            selectedProduct: null,
            selectedPrice: 0,
            selectedQty: 0,
            selectedTotal: 0,
            selectedProductList: {},
            buyer: '',
            date: new Date(),
            dueDate: new Date(),
            status: 'open',
            oid: 0,
            order: {
                isOrder: false,
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
    };

    handleClickEditItem = (pid) => {
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

    // submit order to fb
    handleClickSubmitOrder = () => {
        console.log(this.state);
        alert('submit order');
        let { order, oid, date, dueDate, buyer, status } = this.state;
        oid += 1;
        date = this.formatDate(date);
        dueDate = this.formatDate(dueDate);

        this.ordersRef
            .push({
                buyer: buyer,
                date: date,
                dueDate: dueDate,
                status: status,
                oid: oid,
                order: order,
            })
            .then((snapshot) => {
                // redirect to create page
                this.props.history.push(`/order/${snapshot.key}`);
            });
        // increment order
        this.orderCountRef.set(oid);
    };

    handleDateChange = (date) => {
        this.setState({
            dueDate: date,
        });
    };

    handleFormBuyerChange = (e) => {
        let buyer = e.target.value;
        this.setState({
            buyer: buyer,
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
            this.setState({
                isProductLoaded: true,
                products: products,
                selectedProduct: 'wt',
                selectedPrice: products.wt.price,
            });
        });
    }

    render() {
        if (this.state.isProductLoaded) {
            return (
                <div>
                    <Container fluid={true}>
                        <Container>
                            <Header />
                        </Container>
                    </Container>
                    <Container>
                        <Form>
                            <Row>
                                <Col>Id: {this.state.oid + 1}</Col>
                                <Col>
                                    <Form.Group controlId="orderInfoForm-buyer">
                                        <Form.Label>buyer</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="buyer"
                                            onChange={
                                                this.handleFormBuyerChange
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="orderInfoForm-date">
                                        <Form.Label>Date</Form.Label>
                                        {this.formatDate(new Date())}
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

                        <Row>
                            <Col>
                                <ProductsMenu
                                    products={this.state.products}
                                    selectedProduct={this.state.selectedProduct}
                                    isProductSelected={
                                        this.state.isProductSelected
                                    }
                                    click={this.handleClickSelectItem}
                                />
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
                                            selectedTotal={
                                                this.state.selectedTotal
                                            }
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
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}
