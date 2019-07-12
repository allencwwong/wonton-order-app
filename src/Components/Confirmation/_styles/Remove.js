import styled from 'styled-components';
import { Card } from '../../../_styles';

export const CSSRemove = styled(Card)`
    position: absolute;
    z-index: 999;
    width: 100%;
    top: 0;

    .card-body {
        background-color: #fff;
    }
`;
