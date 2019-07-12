import styled from 'styled-components';
import { Row } from './../../../_styles';

export const CSSHeader = styled(Row)`
    margin: 12px 0;

    .col {
        padding-left: 0;
    }
`;

export const CSSBackToDash = styled.a`
    font-size: 18px;
    p {
        margin: 6px;
    }
    .badge svg {
        margin-right: 6px;
    }
`;
