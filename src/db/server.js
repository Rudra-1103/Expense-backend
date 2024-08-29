import mongoose from "mongoose";


export const connectDB = async()=>{

    try {
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log(`\n Connected to MongoDB Database: ${connectionInstance.connections[0].name}`);
        
    } catch (error) {
        console.log('Error connecting to the database', error);
        process.exit(1);
    }

}