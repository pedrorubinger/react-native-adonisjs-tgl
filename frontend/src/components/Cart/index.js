import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import CartIcon from '../Cart/Icon';
import { Creators as GameActions } from '../../store/ducks/games';
import { Creators as CartActions } from '../../store/ducks/cart';
import Game from '../Games/Game';
import ArrowButton from '../UI/Buttons/ArrowButton';

const Cart = ({ navigation, auth, betTypes, cart, addGames, clearCart }) => {
    const [isLoading, setIsLoading] = useState(false);

    const saveOnPressHandler = () => {
        const minCartValue = betTypes.data
            .filter((bet) => bet.id === betTypes.active[0])[0].min_cart_value;

        if(price() < minCartValue)
            return Alert.alert(
                'Minimum purchase amount',
                `You must make at least R$ ${parseFloat(minCartValue).toFixed(2)} in purchases!`,
                [{
                    text: 'Okay',
                    onPress: () => {},
                    style: 'cancel'
                }],
                { cancelable: false }
            );

        setIsLoading(true);

        const games = {
            "games": cart.items.map((item) => ({
                "user_id": auth.userId,
                "bet_id": item.bet_id,
                "numbers": item.numbers
            }))
        };

        addGames(games);
        setIsLoading(false);

        Alert.alert(
            `Purchase successful!`,
            'Your bets have been saved!!',
            [{
                text: 'Okay',
                onPress: () => navigation.toggleDrawer(),
                style: 'default'
            }],
            { cancelable: false }
        );

        return clearCart();
    };

    const price = () => (parseFloat(cart.items.reduce((acc, actual) => 
        acc + actual.price, 0)).toFixed(2));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text
                    onPress={() => navigation.toggleDrawer()}
                    style={styles.closeIcon}
                >
                    &times;
                </Text>
                <View style={styles.titleBox}>
                    <CartIcon
                        size={40}
                        style={{ marginRight: 12 }}
                    />
                    <Text style={styles.titleText}>Cart</Text>
                </View>
            </View>

            <ScrollView>
                <View style={styles.content}>
                    { cart.items.length ?
                            cart.items.map((game) => (
                                <Game key={game.id} game={game} cart />
                            ))
                        :
                            <Text style={styles.emptyCart}>
                                Your cart is empty.
                            </Text>
                    }
                </View>
            </ScrollView>
                {!!cart.items.length &&
                    <>
                        <Text style={styles.price}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Cart </Text>
                            Total: &nbsp;&nbsp;&nbsp;&nbsp;R$ {price()}
                        </Text>

                        <View style={styles.buttonBox}>
                            <ArrowButton
                                arrow={isLoading ? 'none' : 'default'}
                                color="greenButton"
                                onPress={saveOnPressHandler}
                                disabled={isLoading}
                                size="big"
                            >
                                {isLoading ? 'Loading...' : 'Save'}
                            </ArrowButton>
                        </View>
                    </>
                }
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },

    header: {
        marginTop: 20,
        alignSelf: 'stretch',
        display: 'flex',
        padding: 25,
        paddingTop: 0,
        paddingBottom: 15,
        justifyContent: 'center'
    },

    titleBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    titleText: {
        color: '#707070',
        textTransform: 'uppercase',
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    closeIcon: {
        color: '#B5C300',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'right',
    },

    content: { flex: 1 },

    numbers: {
        textAlign: 'left',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 0,
        color: '#868686'
    },

    emptyCart: {
        textAlign: 'center',
        color: '#707070',
        fontStyle: 'italic',
        fontSize: 20
    },

    price: {
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#707070',
        margin: 0,
        marginTop: 20,
        marginBottom: 20
    },

    buttonBox: { backgroundColor: '#EBEBEB', paddingBottom: 10, bottom: 0 }
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    betTypes: state.betTypes,
    cart: state.cart
});

const mapDispatchToProps = (dispatch) => ({
    addGames: (games) => dispatch(GameActions.addGames(games)),
    clearCart: () => dispatch(CartActions.clearCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);