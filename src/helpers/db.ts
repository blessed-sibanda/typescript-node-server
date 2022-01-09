import mongoose from 'mongoose';

const connectDb = (uri: string) => {
  const connect = () =>
    mongoose
      .connect(uri)
      .then(() => console.info(`Database connection sucess: ${uri}`))
      .catch((err) => {
        console.error(`Error connecting to database: ${err}`);
        return process.exit(1);
      });

  connect();
  mongoose.connection.on('disconnected', connect);
};

export { connectDb };
