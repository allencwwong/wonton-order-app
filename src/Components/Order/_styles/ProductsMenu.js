import styled from 'styled-components';

export const CSSProductsMenuItem = styled.div`
    .menu-item {
        cursor: pointer;
        border-color: ${(props) => props.active && 'green'};
        background-color: ${(props) => props.active && '#dbffe2'};
    }
    .product-icon {
        width: 100%;
        height: 100%;
    }
`;
