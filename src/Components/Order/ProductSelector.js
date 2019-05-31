import React, { Component } from 'react';
import { database } from './../../firebase';
import { Row, Col } from './../../_styles';
import { ProductOrderPanel } from './ProductOrderPanel';
import { ProductsMenu } from './ProductsMenu';

export class ProductSelector extends Component {
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
        };
    }

    handleSelectItem = (e) => {
        console.log('clicked');
        let selectedProduct = e.currentTarget.getAttribute('data-pid');
        console.log(selectedProduct);
        this.state.isProductSelected &&
        selectedProduct === this.state.selectedProduct
            ? this.setState({
                  isProductSelected: false,
                  selectedProduct: selectedProduct,
              })
            : this.setState({
                  isProductSelected: true,
                  selectedProduct: selectedProduct,
              });
    };

    componentDidMount() {
        this.productRef.on('value', (snapshot) => {
            let products = snapshot.val();

            this.setState({
                isProductLoaded: true,
                products: products,
            });
        });
    }

    render() {
        if (this.state.isProductLoaded) {
            return (
                <Row>
                    <Col xs={12}>
                        <ProductsMenu
                            products={this.state.products}
                            selectedProduct={this.state.selectedProduct}
                            isProductSelected={this.state.isProductSelected}
                            click={this.handleSelectItem}
                        />
                    </Col>
                    <Col xs={12}>
                        <ProductOrderPanel
                            selectedProduct={this.state.selectedProduct}
                            products={this.state.products}
                        />
                    </Col>
                </Row>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}
