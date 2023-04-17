import mongoose from "mongoose";

const connection = {}

const dbConnect = async () => {
    if(connection.isConnected){
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.error("Failed to connect to the database!", error)
    }
}

export default dbConnect