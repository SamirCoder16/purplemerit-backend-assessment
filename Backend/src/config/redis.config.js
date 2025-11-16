import { Redis } from "@upstash/redis";
import { ENV } from "../lib/env.js";

const redisClient = new Redis({
  url: ENV.UPSTASH_REDIS_REST_URL,
  token: ENV.UPSTASH_REDIS_REST_TOKEN,
});

(async () => {
  try {
    await redisClient.set("test_key", "Upstash Redis Connected ✅");
    const value = await redisClient.get("test_key");
    console.log(`Redis Test Key Value: ${value}`);
  } catch (error) {
    console.error("Error connecting to Upstash Redis:", error);
  }
})();

export default redisClient;
