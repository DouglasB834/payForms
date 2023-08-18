import "dotenv/config";

const mongodb = process.env.MONGODB_URL;

export default {
  url: mongodb,
};
