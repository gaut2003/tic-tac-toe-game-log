import { Game } from "../models/game-model.js";

const postGames = async (req, res) => {
    try {
        const gameStats = req.body;
        const gameData = await Game.create(gameStats);
        res.status(201).send({
            message: "Game stats saved successfully",
            data: gameData
        })
    } catch (error) {
        res.status(400).send(error);
    }
}

const getGames = async (req, res) => {
    try {
        const games = await Game.find({});
        res.status(200).send({
            message: "Data fetched successfully",
            data: games
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

export { postGames, getGames };

// {
//     "player1" : "Gautam",
//     "player2" : "Agarwal",
//     "winner" : "Gautam",
//     "score1" : 10,
//     "score2" : 7
// }