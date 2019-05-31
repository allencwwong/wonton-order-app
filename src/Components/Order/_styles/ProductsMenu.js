import styled from 'styled-components';

export const CSSProductsMenuItem = styled.div`
    .menu-item {
        cursor: pointer;
        background-color: ${(props) => (props.active ? 'green' : 'red')};
    }
`;
