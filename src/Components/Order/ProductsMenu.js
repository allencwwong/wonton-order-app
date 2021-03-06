import React, { Component } from 'react';
import { Row, Col, Card } from '../../_styles';
import { CSSProductsMenuItem } from './_styles';

export class ProductsMenu extends Component {
    createProductsMenu = (product, pid, idx, selectedProduct) => {
        let isSelectedProduct;
        if (selectedProduct === pid) {
            isSelectedProduct = true;
        } else {
            isSelectedProduct = false;
        }
        return (
            <Col xs={3} key={idx}>
                <CSSProductsMenuItem active={isSelectedProduct}>
                    <Card
                        className="menu-item"
                        body
                        data-pid={pid}
                        data-isproductselected={isSelectedProduct}
                        onClick={(e) => this.props.click(e)}>
                        <Row>
                            <img
                                className="product-icon"
                                src={`/${product.icon}`}
                            />
                        </Row>
                        <Row>{product.name.cn}</Row>
                        <Row>${product.price}</Row>
                    </Card>
                </CSSProductsMenuItem>
            </Col>
        );
    };

    render() {
        // create product menu
        const { products, selectedProduct } = this.props;
        let productsMenu = [],
            productsList = Object.keys(products);

        productsList.forEach((product, idx) => {
            productsMenu.push(
                this.createProductsMenu(
                    products[product],
                    product,
                    idx,
                    selectedProduct,
                ),
            );
        });

        return (
            <div>
                <Row>
                    <Col>
                        <h1>Products:</h1>
                    </Col>
                </Row>
                <Row>{productsMenu}</Row>
            </div>
        );
    }
}
