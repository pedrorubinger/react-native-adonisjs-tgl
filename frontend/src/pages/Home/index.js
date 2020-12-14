import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import PageTitle from '../../components/UI/PageTitle';
import BetTypesBar from '../../components/BetTypesBar';
import { Creators as BetTypesActions } from '../../store/ducks/betTypes';
import Loading from '../../components/UI/Loading';
import Games from '../../components/Games';

const Home = ({ betTypes, fetchBetTypes, navigation }) => {
    useEffect(() => {
        if(!betTypes.fetched) fetchBetTypes();
    }, [fetchBetTypes, betTypes.fetched]);

    if(!betTypes.fetched) return <View style={{ marginTop: 50 }}><Loading /></View>;

    if(betTypes.error)
        return <Text>Error: {betTypes.error.toString()}</Text>;

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView style={styles.content}>
                <PageTitle>Recent Games</PageTitle>
                <Text style={styles.filters}>Filters</Text>
                <BetTypesBar />
                <Games />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { backgroundColor: '#F7F7F7', padding: 20 },

    filters: {
        color: '#868686',
        fontStyle: 'italic',
        fontSize: 17,
        marginTop: 10,
        marginBottom: 10
    },
});

const mapStateToProps = (state) => ({ betTypes: state.betTypes });
const mapDispatchToProps = (dispatch) => ({
    fetchBetTypes: () => dispatch(BetTypesActions.betTypesStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);