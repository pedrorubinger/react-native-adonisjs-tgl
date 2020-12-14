import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { MarkerBox, TypeTitle, Marker, CartMarker } from './styles';
import { Creators as CartActions } from '../../../store/ducks/cart';

const Game = ({ betTypes, game, cart, removeItem }) => {
    const pallete = betTypes.data.map((item) => (
        { type: item.type, color: item.color }));
    const color = pallete.filter((item) => item.type === game.type)[0].color || '';
    const iconName = (Platform.OS === 'ios' ? 'ios' : 'md') + '-trash';

    return (
        <View style={styles.container}>
            <MarkerBox color={color} marginLeft={cart ? "12px" : false}>
                    { cart
                        ? <>
                                <Text>
                                    <Ionicons
                                        name={iconName}
                                        onPress={() => removeItem(game.id)}
                                        size={25}
                                        color="#707070"
                                    />
                                </Text>

                                <CartMarker color={color} />
                          </>
                        : <Marker color={color} />
                    }
            </MarkerBox>

            <View style={cart ? styles.cartGameContent : styles.gameContent}>
                <View style={styles.numbersContainer}>
                    <Text
                        numberOfLines={10}
                        style={styles.numbers}
                    >
                        {game.numbers}
                    </Text>
                </View>

                <Text style={styles.info}>
                    {game.date || new Date().toLocaleDateString()}
                    &nbsp;- (R$ {parseFloat(game.price).toFixed(2)})
                </Text>

                <TypeTitle color={color}>
                    {game.type}
                </TypeTitle>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15
    },

    gameContent: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 11,
        // backgroundColor: 'red',
        width: Dimensions.get('window').width - 70
    },

    cartGameContent: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 11,
        width: Dimensions.get('window').width - 170,
        justifyContent: 'center',
        paddingBottom: 10
    },

    numbersContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },

    numbers: {
        textAlign: 'left',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 0,
        color: '#868686'
    },

    info: {
        marginTop: 3,
        textAlign: 'left',
        fontSize: 14,
        color: '#868686',
        height: 'auto',
        padding: 0,
    }
});

const mapStateToProps = (state) => ({ betTypes: state.betTypes });
const mapDispatchToProps = (dispatch) => ({
    removeItem: (id) => dispatch(CartActions.removeFromCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);