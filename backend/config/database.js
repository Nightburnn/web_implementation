import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnect;