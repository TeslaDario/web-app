import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType;
const redisInit = async () => {
  redisClient = createClient();

  redisClient.on("error", (error) => {
    console.log(error);
  });
  redisClient.on("connect", () => {
    console.log("Redis connected!");
  });

  await redisClient.connect();
};

export { redisInit, redisClient };
