import styled from 'styled-components';
import { Container } from '../../../_styles';

export const CSSRemove = styled(Container)`
    position: relative;
    .card {
        position: absolute;
        z-index: 999;
        top: 20px;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }
    .card-body {
        background-color: #fff;
        box-sizing: border-box;
    }

    @media (min-width: 768px) {
        .card {
            width: 40%;
            margin-left: 30%;
            margin-right: 30%;
        }
    }
`;

export const CSSOverlay = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.8;
    z-index: 99;
`;
