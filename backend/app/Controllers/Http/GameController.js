'use strict'

const Game = use('App/Models/Game')
const Database = use('Database')

class GameController {
    async store ({ request }) {
        const data = await request.input('games')
        const game = await Game.createMany(data)

        return game
    }

    async index ({ request, params, response }) {
        const splitted = params.filter.split(';')
        const sqlFilter = params.filter === 'all'
            ? `bets.id LIKE '%'`
            : splitted.reduce((acc, cur, i) => 
                `${acc} bet_id = '${cur}' ${splitted.length - 1 !== i ? 'OR' : ''}`,
                ''
            ).toString()

        try {
            const { page } = request.get()

            const games = await Database
                .table('games')
                .select(
                    'games.id',
                    'user_id',
                    'numbers',
                    'games.created_at',
                    'bets.type',
                    'bets.price'
                )
                .from('games')
                .innerJoin('bets', 'games.bet_id', 'bets.id')
                .whereRaw(`user_id = ${params.user} AND (${sqlFilter})`)
                .paginate(page, 10)

            return games
        } catch (error) {
            return response.status(error.status || 500).send({
                success: false,
                message: 'Error trying to get games.' + error
            })
        }
    }
}

module.exports = GameController
