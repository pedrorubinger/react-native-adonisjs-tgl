import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import RoundedButton from '../Buttons/RoundedButton';
import { Creators as BetTypesActions } from '../../store/ducks/betTypes';

/**
 * @param {Boolean} inactivate Defines whether the bet type button bar removes the
 * filter when clicking
*/
const BetTypesBar = ({ betTypes, setActive, inactivate = false }) => {
    const setActiveButton = (_, id) => {
        if(inactivate) return betTypes.active[0] === id ? false : setActive([id]);
        else {
            if(betTypes.active.some((filter) => filter === id)) {
                setActive([...betTypes.active].filter((filter) => filter !== id));
            } else {
                const arr = [...betTypes.active];
                
                arr.push(id);
                setActive(arr);
            }
        }
    };

    return (
        <View style={styles.buttonsContainer}>
            {betTypes.data.map(bet => (
                <RoundedButton
                    key={bet.type}
                    color={bet.color}
                    active={betTypes.active.some((filter) => filter === bet.id)}
                    radius="rounded"
                    size="small"
                    onPressHandler={(e) => setActiveButton(e, bet.id)}
                >
                    {bet.type}
                    { betTypes.active.some((filter) => filter === bet.id)
                        && !inactivate && <Text>&nbsp;&times;</Text>
                    }
                </RoundedButton>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
});

const mapStateToProps = (state) => ({ betTypes: state.betTypes });
const mapDispatchToProps = (dispatch) => ({
    setActive: (filter) => dispatch(BetTypesActions.betTypesActive(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(BetTypesBar);