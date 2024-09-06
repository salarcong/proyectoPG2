import mongoose from "mongoose";

export const connectDB = async () => { 
    try { 
        await mongoose.connect("mongodb+srv://salarcong:Perrovolador123@cluster0.xikvt4l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"); 
        console.log("Conexión exitosa a la base de datos"); 
    }
    catch (error) { 
        console.log("Error al conectar a la base de datos", error); 
    } 
};