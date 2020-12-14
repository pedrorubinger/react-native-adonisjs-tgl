import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { Creators as GameActions } from '../../store/ducks/games';
import Game from './Game';
import Loading from '../UI/Loading';
import Pagination from '../Pagination';

const Games = ({ auth, gamesData, betTypes, fetchGames }) => {
    useEffect(() => {
        fetchGames(auth.userId, betTypes.active);
    }, [fetchGames, auth.userId, betTypes.active]);

    if(!gamesData.fetched)
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                    Please wait. Your games are being loaded...
                </Text>
                <Loading />
            </View>
        );

    return (
        <View style={styles.container}>
            {gamesData.error && <Text>Error: {gamesData.error.toString()}</Text>}

            {
                !!gamesData.games.length && !gamesData.error &&
                    gamesData.games.map((game) => <Game game={game} key={game.id} />)
            }

            {
                !!!gamesData.games.length && !gamesData.error &&
                    <Text style={styles.emptyMessage}>
                        { betTypes.active.length === 1
                            ? `You don't have any ${
                                betTypes.data[betTypes.active[0] - 1].type} bets yet.`
                            : 'You don\'t have any games yet.'
                        }
                        <Text>
                            {'\n'}Click 
                            <Text style={{ color: '#B5C300', fontWeight: 'bold' }}>
                                &nbsp;New Bet
                            </Text> to start betting.
                        </Text>
                    </Text>
            }

            {gamesData.pagination.lastPage > 1 && <Pagination />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 25,
        marginTop: 10
    },

    emptyMessage: {
        marginTop: 20,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#707070'
    }
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    gamesData: state.games,
    betTypes: state.betTypes
});

const mapDispatchToProps = (dispatch) => ({
    fetchGames: (userId, filter) => 
        dispatch(GameActions.fetchGamesRequest(userId, filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);