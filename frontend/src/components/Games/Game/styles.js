import styled from 'styled-components/native';

export const MarkerBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 3px;
    margin-left: ${(props) => props.marginLeft ? props.marginLeft : '3px'};
`;

export const Marker = styled.View`
    width: 6px;
    height: 94px;
    border-radius: 100px;
    opacity: 1;
    margin-right: 10px;
    background-color: ${(props) => props.color};
`;

export const CartMarker = styled.View`
    border-radius: 100px;
    width: 6px;
    height: 100px;
    margin-right: 10px;
    margin-left: 15px;
    background-color: ${(props) => props.color};
`;

export const TypeTitle = styled.Text`
    color: ${(props) => props.color};
    font-style: italic;
    font-weight: bold;
    margin-top: 5px;
`;

// border-radius: 100px 0px 0px 100px;