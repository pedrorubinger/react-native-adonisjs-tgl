import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import BetTypesBar from '../../components/BetTypesBar';
import { Creators as BetTypesActions } from '../../store/ducks/betTypes';
import Loading from '../../components/UI/Loading';
import PageTitle from '../../components/UI/PageTitle';
import NumbersChart from '../../components/NumbersChart';
import VirtualizedView from '../../components/VirtualizedView';

const NewBet = ({ betTypes, fetchBetTypes, setActive, navigation, activeTab }) => {
    useEffect(() => {
        if(!betTypes.fetched) fetchBetTypes();
        if(betTypes.active.length !== 1 && activeTab) setActive([betTypes.data[0].id]);
    }, [
        fetchBetTypes,
        betTypes.fetched,
        betTypes.active,
        betTypes.data[0],
        activeTab,
        setActive
    ]);

    const data = !!betTypes.active.length
        ? betTypes.data.filter((bet) => bet.id === betTypes.active[0])[0]
        : betTypes.data[0];

    if(!activeTab) return null;

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <VirtualizedView style={styles.content}>
                {
                    betTypes.error
                        ? <Text>Error: {betTypes.error}</Text>
                        : betTypes.active.length !== 1?
                            <Loading /> :
                            <View style={styles.header}>
                                <PageTitle>
                                    New Bet for&nbsp;
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {data.type}
                                    </Text>
                                </PageTitle>

                                <Text style={styles.label}>Choose a game</Text>
                                <BetTypesBar inactivate />

                                <View>
                                    <NumbersChart
                                        betType={data}
                                        navigation={navigation}
                                    />
                                </View>
                            </View>
                }
            </VirtualizedView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { backgroundColor: '#F7F7F7', padding: 20 },

    label: {
        color: '#868686',
        fontStyle: 'italic',
        fontSize: 17,
        marginTop: 10,
        marginBottom: 10
    },
});

const mapStateToProps = (state) => ({ betTypes: state.betTypes });
const mapDispatchToProps = (dispatch) => ({
    fetchBetTypes: () => dispatch(BetTypesActions.betTypesStart()),
    setActive: (active) => dispatch(BetTypesActions.betTypesActive(active))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBet);