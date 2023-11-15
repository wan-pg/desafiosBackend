import mongoose from "mongoose";

const ticketColeccion = 'tickets'
const ticketEsquema = new mongoose.Schema({

    code:String,
    amount: Number,
    purchaser:String,
    purchase_datetime: String
},{
    timestamps:{
        createdAt:"fecha de alta",
        updatedAt:"fecha de modificacion"
    }
})

export const ticketModelo = mongoose.model(ticketColeccion, ticketEsquema)