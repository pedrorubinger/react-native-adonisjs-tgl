import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity`
    background-color: ${(props) => props.bg ? props.color : '#FFFFFF'};
    border-width: 2px;
    border-color: ${(props) => props.color || '#4e9fce'};
    border-radius: ${(props) => props.radius === 'rounded' ? '100px' : '10px'};
    padding: 5px ${(props) => props.radius === 'rounded' ? '21px' : '10px'};
    margin-top: 10px;
    margin-right: 6px;
`;

export const ButtonText = styled.Text`
    color: ${(props) => props.bg ? '#FFFFFF' : props.color};
    font-size: ${(props) => props.size.font};
    font-weight: bold;
`;