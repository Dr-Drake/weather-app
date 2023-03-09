import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: rgba(0,0,0,0.4);
    color: #fff;
    padding: 5%;

    &:before{
        content: '';
        background: url('./assets/sunset.jpg') no-repeat center center/cover;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const WeatherInput = styled.input`
    padding: .7rem 1.5rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255, 0.8);
    background: rgba(255,255,255, 0.1);
    color: #f8f8f8;
    text-align: center;

    &::placeholder {
        color: #f8f8f8;
    }
`;

export const WeatherDataDisplay = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 3% 0;
    transition: all 0.5s;

    & p{
        font-size: 1.2rem;
    }

    .temp{
        font-size: 4rem;
    }
`;

export const WeatherFooter = styled.div`
    .bottom {
        display: flex;
        justify-content: space-evenly;
        text-align: center;
        width: 100%;
        margin: 1rem auto;
        padding: 1rem;
        border-radius: 12px;
        background-color: rgba(255,255,255, 0.2);
    }


    .meta{
        & p:first-child{
            font-weight: 700;
        }
    }

`;
