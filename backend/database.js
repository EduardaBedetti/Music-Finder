const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB conectado com sucesso!");
    } catch (err) {
        console.log("Erro ao conectar ao MongoDB:", err);
    }
}

module.exports = connectDB;
