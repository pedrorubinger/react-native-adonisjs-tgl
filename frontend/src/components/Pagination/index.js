import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { Creators as GameActions } from '../../store/ducks/games';

const Pagination = ({ auth, betTypes, pagination, fetchGames }) => {
    const previousPage = Math.ceil((pagination.page - 5) / 5) * 5;
    const maxPerPaginationBar = 5;
    let lastPagePaginationBar = 5;
    let pagingBarSize = maxPerPaginationBar;

    const getLastPageOfPaginationBar = () => {
        if(pagination.page % maxPerPaginationBar === 0) return pagination.page;
        if(pagination.page === lastPagePaginationBar) return pagination.page;
        
        lastPagePaginationBar = pagination.page + 
        (maxPerPaginationBar - (pagination.page % maxPerPaginationBar));

        return lastPagePaginationBar;
    };

    if(pagination.lastPage % maxPerPaginationBar === 0
        || pagination.lastPage === maxPerPaginationBar)
        pagingBarSize = 5;
    else if(getLastPageOfPaginationBar() >= pagination.lastPage)
        pagingBarSize = pagination.lastPage % maxPerPaginationBar;

    const setPage = (_, page) => {
        if(page === pagination.page) return false;

        fetchGames(auth.userId, betTypes.active, page);
    };

    const getNextPage = () => {
        if(pagination.page < maxPerPaginationBar) return maxPerPaginationBar + 1;
        if(pagination.page % maxPerPaginationBar === 0) return pagination.page + 1;
        else return getLastPageOfPaginationBar() + 1;
    }

    return (
        <View style={styles.container}>
            {
                pagination.page > 5 &&
                    <TouchableOpacity
                        style={styles.page}
                        onPress={(evt) => setPage(evt, previousPage)}
                    >
                        <Text style={styles.pageText}>&lt;</Text>
                    </TouchableOpacity>
            }

            {
                Array.from(Array(pagingBarSize)).map((pg, i) => {
                    const page = i + (previousPage) + 1;
                    const color = pagination.page === page
                        ? 'rgb(190, 131, 2)' : 'black';
                    const backgroundColor = pagination.page === page
                        ? 'rgb(231, 231, 231)'
                        : 'rgb(255, 255, 255)'

                    return (
                        <TouchableOpacity
                            key={page}
                            onPress={(evt) => setPage(evt, page)}
                            style={{ ...styles.page, backgroundColor }}
                        >
                            <Text style={{ ...styles.pageText, color }}>
                                {page}
                            </Text>
                        </TouchableOpacity>
                    );
                })
            }

            {
                pagination.lastPage > maxPerPaginationBar
                    && pagingBarSize === maxPerPaginationBar
                    && getLastPageOfPaginationBar() !== pagination.lastPage &&
                        <TouchableOpacity
                            style={styles.page}
                            onPress={(evt) => setPage(evt, getNextPage())}
                        >
                            <Text style={styles.pageText}>&gt;</Text>
                        </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        padding: 0,
        paddingTop: 20,
        paddingBottom: 30,
        justifyContent: 'center'
    },

    page: {
        backgroundColor: 'rgb(255, 255, 255)',
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgb(206, 204, 204)',
        width: 40
    },

    pageText: {
        fontSize: 13,
        textAlign: 'center',
        color: 'black'
    }
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    betTypes: state.betTypes,
    pagination: state.games.pagination
});

const mapDispatchToProps = (dispatch) => ({
    fetchGames: (userId, filters, page) => 
        dispatch(GameActions.fetchGamesRequest(userId, filters, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);