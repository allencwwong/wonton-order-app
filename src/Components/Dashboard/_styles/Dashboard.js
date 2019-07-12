import styled from 'styled-components';
import { Col, Row } from '../../../_styles';

export const CSSOrderInfoCard = styled.div`
    .list-group-item {
        padding: 8px 20px;
    }
    .card-body {
        padding: 0;
    }
    .card-footer {
        padding: 0;
    }
`;

export const CSSOrderInfoBtn = styled(Col)`
    width: 100%;
    padding: 0;

    a:first-child {
        border-radius: 0 0 0 3px;
    }

    a {
        width: 50%;
        float: left;
        border-radius: 0 0 3px 0;
        display: inline-block;
        font-size: 14px;
        padding: 0.25rem 0.5rem;
    }

    @media (min-width: 992px) {
        a {
            font-size: 16px;
            padding: 0.375rem 0.75rem;
        }
    }
`;

export const CSSOrderListing = styled(Row)`
    padding: 15px 0;
`;
