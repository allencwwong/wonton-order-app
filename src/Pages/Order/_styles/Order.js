import styled from 'styled-components';

export const CSSOrderDetails = styled.div`
    .order-info-card {
        margin-bottom: 10px;
    }
    .order-info-card .card-header,
    .order-info-card .card-body {
        padding: 2px;
        text-align: center;
    }
    .order-info-card .form-group {
        margin-bottom: 0;
        overflow: hidden;
    }
    @media (min-width: 568px) {
        padding: 8px;
    }
`;
