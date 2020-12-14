import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import NewBet from '../../pages/NewBet';

let ScreenHeight = Dimensions.get("window").width;

const Drawer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.drawer}>
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
        backgroundColor: 'orange'
    },

    drawer: {
        flex: 1,
        backgroundColor: 'red'
    }
});

export default Drawer;