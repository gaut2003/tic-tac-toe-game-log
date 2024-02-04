import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    player1: {
        type: String,
        required: true
    },
    player2: {
        type: String,
        required: true
    },
    winner: {
        type: String, 
        required: true
    },
    score1: {
        type: Number, 
        required: true
    }, 
    score2: {
        type: Number, 
        required: true
    }
}, {
    timestamps: true
})

export const Game = mongoose.model("Game", gameSchema);