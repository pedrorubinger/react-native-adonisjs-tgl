import React from 'react';

import { StyledButton, ButtonText } from './styles';

const RoundedButton = ({
    children,
    onPressHandler,
    color = 'default',
    active,
    type = 'button',
    size = 'normal',
    radius = 'default',
    disabled = false
}) => {
    const sizeObj = {
        'small': { font: '12px', width: '80px', height: '30px' },
        'normal': { font: '16px', width: '135px', height: '52px' },
        'big': { font: '16px', width: '209px', height: '52px' }
    };

    return (
        <StyledButton
            type={type}
            color={color}
            bg={active}
            radius={radius}
            onPress={onPressHandler}
            disabled={disabled}
        >
            <ButtonText
                bg={active}
                color={color}
                size={sizeObj[size]}
            >
                {children}
                {/* {active && <Text>&nbsp;&times;</Text>} */}
            </ButtonText>
        </StyledButton>
    );
};

export default RoundedButton;