import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import NewBet from '../../pages/NewBet';
let ScreenHeight = Dimensions.get("window").width;
const Drawer = ({ cart }) => {

    console.log(ScreenHeight);
    return (
        <View style={styles.container}>
            <View style={styles.drawer}>
                <Text>Ola</Text>
                <NewBet />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: ScreenHeight + 100,
        backgroundColor: 'orange',
        // justifyContent: 'flex-end'
    },

    drawer: {
        flex: 1,
        // position: 'absolute',
        // height: 100,
        backgroundColor: 'red'
    }
});

const mapStateToProps = (state) => ({ cart: state.cart });

export default connect(mapStateToProps)(Drawer);