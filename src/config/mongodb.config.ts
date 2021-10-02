export const mongodbConfig = {
  uri: process.env.MONGO_URI,
  mongooseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
};
