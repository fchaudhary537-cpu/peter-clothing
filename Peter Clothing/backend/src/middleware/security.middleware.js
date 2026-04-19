import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "../config/env.js";

function sanitizePayload(value) {
  if (typeof value === "string") {
    return value.replace(/<[^>]*>?/gm, "").trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizePayload);
  }

  if (value && typeof value === "object") {
    const output = {};
    for (const [k, v] of Object.entries(value)) {
      output[k] = sanitizePayload(v);
    }
    return output;
  }

  return value;
}

export function applySecurity(app) {
  app.use(helmet());
  app.use(
    cors({
      origin: [env.appOrigin],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    })
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
  app.use(compression());
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  app.use((req, _res, next) => {
    if (req.body && typeof req.body === "object") {
      req.body = sanitizePayload(req.body);
    }
    next();
  });
}