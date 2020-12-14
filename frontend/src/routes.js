import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { Platform, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './pages/Home';
import Account from './pages/Account';
import NewBet from './pages/NewBet';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PasswordRecovery from './pages/PasswordRecovery';
import ResetPassword from './pages/ResetPassword';
import { Creators as AuthActions } from '../src/store/ducks/auth';
import Loading from './components/UI/Loading';
import Cart from './components/Cart';

const RootStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const BottomTabs = () => (
    <Tabs.Navigator screenOptions={({ route }) => ({
        tabBarLabel: ({ focused, color }) => {
        const { name } = route;

        return focused
            ? <Text style={{ fontWeight: 'bold', color: '#707070' }}>{name}</Text>
            : <Text style={{ fontWeight: 'normal', color }}>{name}</Text>
        },

        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if(route.name === 'Home') iconName = 'home';
            else if(route.name === 'NewBet') iconName = 'add-circle-outline';
            else if(route.name === 'Account') iconName = 'person';

            return (
                <View
                    style={focused
                        ? {
                            borderTopWidth: 3,
                            borderTopColor: '#B5C401',
                            borderRadius: 2
                        } : {}
                }>
                    <Ionicons
                        name={Platform.OS === 'ios'
                            ? 'ios-' + iconName
                            : 'md-' + iconName
                        }
                        size={size}
                        color={focused ? '#B5C401' : color}
                    />
                </View>
            );
        }
    })}
    tabBarOptions={{
        activeTintColor: '#B5C401',
        inactiveTintColor: '#C1C1C1',

        style: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: 72,
            paddingBottom: 10,
            paddingTop: 10,
            borderWidth: 0
        }
    }}>
        <Tabs.Screen name="Home" component={Home} />
        <Tabs.Screen name="NewBet">
            {(props) => <NewBet activeTab={props.navigation.isFocused()} {...props} />}
        </Tabs.Screen>
        <Tabs.Screen name="Account" component={Account} />
    </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
    <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <Cart {...props} />}
    >
        <Drawer.Screen name="Home" component={BottomTabs} />
    </Drawer.Navigator>
);

const Router = ({ auth, checkAuth }) => {
    const [allowPublicRoute, setAllowPublicRoute] = useState(false);

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('token');

            if(!token) setAllowPublicRoute(true);
            if(token && !auth.validated) checkAuth();
        })();
    }, [auth.validated, checkAuth]);

    if(!allowPublicRoute && !auth.validated && !auth.error)
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}><Loading /></View>
        );

    if(auth.error && auth.error.status === 500)
        return <Text>Server Error. Please try again later.</Text>;

    return (
        <NavigationContainer>
            {!auth.isAuthenticated
                ? (
                    <RootStack.Navigator screenOptions={{ headerShown: false }}>
                        <RootStack.Screen name="SignIn" component={SignIn} />
                        <RootStack.Screen name="SignUp" component={SignUp} />
                        <RootStack.Screen
                            name="PasswordRecovery"
                            component={PasswordRecovery}
                        />
                        <RootStack.Screen
                            name="ResetPassword"
                            component={ResetPassword}
                        />
                    </RootStack.Navigator>
                ) : <DrawerScreen />
            }

        </NavigationContainer>
    );
}

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(AuthActions.checkAuthStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);