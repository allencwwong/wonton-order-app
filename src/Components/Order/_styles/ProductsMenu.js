import styled from 'styled-components';

export const CSSProductsMenuItem = styled.div`
    .menu-item {
        cursor: pointer;
        border-color: ${(props) => (props.active ? 'green' : '')};
    }
    .product-icon {
        width: 100%;
    }
`;
