const mongoose = require('mongoose');

module.exports = async function connectToDatabase() {
  const mongoUri =
    'mongodb+srv://niranjankalra:4nhbeGU2KJ3TRizO@cluster0.q4ax7k2.mongodb.net/?retryWrites=true&w=majority';

  try {
    const connect = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log(`Connected to MongoDB Atlas : ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
