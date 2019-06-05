import React, { Component } from 'react';
import {
    ProductOrderPanel,
    OrderDetails,
    ProductsMenu,
    OrderBar,
} from './../../Components/Order';
import { Container, Row, Col } from './../../_styles';
import { database } from './../../firebase';

export class OrderNew extends Component {
    // load products
    // loop thru products to create selector menu component with associate id
    // based on id render selector panel => pass in props info - name , img , price
    constructor(props) {
        super(props);
        this.productRef = database.ref('/products');
        this.state = {
            isProductLoaded: false,
            selectedProduct: 'wt',
            isProductSelected: true,
            products: null,
            selectedPrice: 0,
            selectedQty: 0,
            selectedTotal: 0,
            totalQty: 0,
            total: 0,
            buyer: '',
            date: '',
            order: {
                isOrder: false,
                buyer: '',
                date: '',
                orderDetails: {
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
        console.log('+1');
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
        console.log(this.state.order);
    };

    handleClickDecrement = () => {
        console.log('-1');
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
        console.log(orderDetailsId);
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
        console.log('remove order:', pid);
        let order = this.state.order,
            orderDetails = order.orderDetails[pid];
        orderDetails.qty = 0;
        orderDetails.selectedTotal = 0;
        console.log(orderDetails);
        this.setState({
            order: order,
        });
    };

    handleClickSubmitOrder = () => {
        // push order to db
        alert('data submitted');
        // redirect to order details page
    };

    // helper function
    selectedTotal = (selectedQty, price) => {
        return selectedQty * price;
    };

    componentDidMount() {
        // this.productRef.on('value', (snapshot) => {
        //     console.log(snapshot);
        //     let products = snapshot.val();
        //     this.setState({
        //         isProductLoaded: true,
        //         products: products,
        //     });
        // });

        // local dev
        let products = {
            wt: {
                name: {
                    en: 'wonton',
                    cn: 'cn wonton',
                },
                price: 14.5,
            },
            ps: {
                name: {
                    en: 'ps',
                    cn: 'cn ps',
                },
                price: 12.5,
            },
            dhk: {
                name: {
                    en: 'dhk',
                    cn: 'cn dhk',
                },
                price: 16.5,
            },
            dce: {
                name: {
                    en: 'dce',
                    cn: 'cn dce',
                },
                price: 13.5,
            },
        };
        this.setState({
            isProductLoaded: true,
            products: products,
        });
    }

    render() {
        if (this.state.isProductLoaded) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <ProductsMenu
                                products={this.state.products}
                                selectedProduct={this.state.selectedProduct}
                                isProductSelected={this.state.isProductSelected}
                                click={this.handleClickSelectItem}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ProductOrderPanel
                                selectedProduct={this.state.selectedProduct}
                                products={this.state.products}
                                selectedQty={this.state.selectedQty}
                                handleClickIncrement={this.handleClickIncrement}
                                handleClickDecrement={this.handleClickDecrement}
                                handleClickAddProduct={
                                    this.handleClickAddProduct
                                }
                                order={this.state.order}
                                selectedTotal={this.state.selectedTotal}
                                isProductSelected={this.state.isProductSelected}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <OrderDetails
                                order={this.state.order}
                                products={this.state.products}
                                handleClickRemoveOrder={
                                    this.handleClickRemoveOrder
                                }
                            />
                        </Col>
                    </Row>
                    {this.state.total > 0 && (
                        <Row>
                            <Col>
                                <OrderBar
                                    selectedTotal={this.state.total}
                                    handleClickSubmit={
                                        this.handleClickSubmitOrder
                                    }
                                />
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
