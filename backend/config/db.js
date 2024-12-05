const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Usar la variable de entorno MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Terminar el proceso si la conexión falla
  }
};

module.exports = connectDB;
