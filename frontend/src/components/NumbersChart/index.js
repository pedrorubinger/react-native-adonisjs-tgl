import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

import RoundedButton from '../../components/Buttons/RoundedButton';
import { Creators as CartActions } from '../../store/ducks/cart';
import Card from './Card';
import CartIcon from '../Cart/Icon';
import Loading from '../UI/Loading';

const picked = new Set();

const NumbersChart = ({ betType, addToCart, navigation, betTypes }) => {
    const [isReady, setIsReady] = useState(false);
    const setUpdateCard = useState(null)[1];
    const defaultColor = '#B5C401';
    const {
        description,
        range,
        color,
        type,
        price,
        max_number
    } = betType;

    const numbers = Array.from(Array(range)).map((el, i) => ++i);

    const clearGame = () => {
        if(!picked.size) return false;

        picked.clear();
        return setUpdateCard(Date.now());
    };

    useEffect(() => {
        picked.clear();

        setIsReady(true);
    }, [])

    const cardPressHandler = (item, isPicked) => {
        const selected = isPicked ? isPicked : picked.has(item);

        if(selected) picked.delete(item);
        else if(picked.size === max_number) return false;
        else picked.add(item);

        return setUpdateCard(Date.now());
    };

    const completeGameClickHandler = () => {
        while(picked.size < max_number) {
            const value = (Math.floor(Math.random() * range) + 1);
            picked.add(value);
        }

        return setUpdateCard(Date.now());
    };

    const addToCartClickHandler = () => {
        if(picked.size !== max_number)
            return Alert.alert(
                `Incorrect Data`,
                'Please fill out the bet card correctly!',
                [{
                    text: 'Okay',
                    onPress: () => {},
                    style: 'cancel'
                }],
                { cancelable: false }
            );
        
        const game = {
            id: Date.now(),
            type,
            numbers: Array.from(picked).sort((a, b) => a - b).join(', '),
            date: new Date().toLocaleDateString(),
            price,
            bet_id: betType.id
        };

        addToCart(game);
        clearGame();
        navigation.toggleDrawer();
    };

    if(!isReady) return <Loading />;

    return (
        <View>
            {picked.size === 0 && 
                <>
                    <Text style={styles.label}>Fill your bet</Text>
                    <Text style={styles.description}>{description}</Text>
                </>
            }

            <FlatList
            removeClippedSubviews={true}
                style={{
                    flexDirection: 'column',
                    marginTop: !!picked.size ? 10 : 0,
                    marginBottom: !!picked.size ? 10 : 0
                }}
                data={Array.from(picked)}
                listKey={(item) => item.toString()}
                keyExtractor={(item) => item.toString()}
                numColumns={8}
                renderItem={({ item }) => (
                    <Card
                        item={item}
                        color={color}
                        cardPressHandler={cardPressHandler}
                        pickedChart
                        picked={picked}
                    />
                )}
            />

            {picked.size > 0 && 
                <View style={styles.boardButtons}>
                    <RoundedButton
                        color={defaultColor}
                        size="small"
                        onPressHandler={completeGameClickHandler}
                    >
                        <Text>Complete Game</Text>
                    </RoundedButton>

                    <RoundedButton
                        color={defaultColor}
                        size="small"
                        onPressHandler={clearGame}
                    >
                        <Text>Clear Game</Text>
                    </RoundedButton>

                    <RoundedButton
                        color={defaultColor}
                        size="small"
                        onPressHandler={addToCartClickHandler}
                        active
                    >
                        <Text>
                            <CartIcon
                                name={
                                    (Platform.OS === 'ios' ? 'ios' : 'md') +
                                    '-cart'
                                }
                                color="#FFF"
                            />
                            &nbsp;Add to cart
                        </Text>
                    </RoundedButton>
                </View>
            }

            <View style={styles.numbersChart}>
                <FlatList
                    style={styles.numbersChart}
                    data={numbers}
                    keyExtractor={(item) => item.toString()}
                    numColumns={5}
                    renderItem={({ item }) => (
                        <Card
                            item={item}
                            color={color}
                            isPicked={picked.has(item)}
                            cardPressHandler={cardPressHandler}
                        />
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    numbersChart: { marginTop: 15, marginBottom: 20 },
    boardButtons: { display: 'flex', flexDirection: 'row' },
    label: {
        color: '#868686',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: 20,
        marginBottom: 6
    },

    description: { color: '#868686', fontSize: 14, fontStyle: 'italic' }
});

const mapStateToProps = (state) => ({ betTypes: state.betTypes });
const mapDispatchToProps = (dispatch) => ({
    addToCart: (item) => dispatch(CartActions.addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(NumbersChart);