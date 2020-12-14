import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { Creators as AuthActions } from '../../store/ducks/auth';
import Logo from '../Logo';
import CartIcon from '../Cart/Icon';

const Header = ({ logout, cart, navigation }) => {
    const prefix = Platform.OS === 'ios' ? 'ios' : 'md';

    const onPressExit = async () => {
        await AsyncStorage.removeItem('token');
        logout();
    };

    return (
        <View style={styles.container}>
            <Logo />
            <View style={styles.icons}>
                {
                    !!cart.items.length &&
                    <CartIcon
                        size={40}
                        style={{ marginRight: 20 }}
                        onPress={() => navigation.toggleDrawer()}
                    />
                }
                <Ionicons
                    onPress={onPressExit}
                    name={prefix + '-log-out'}
                    color="#C1C1C1"
                    size={40}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 30,
        backgroundColor: '#FFF'
    },

    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    }
});

const mapStateToProps = (state) => ({ cart: state.cart });
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(AuthActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);