import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const redis = Redis.fromEnv();

export const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
});
