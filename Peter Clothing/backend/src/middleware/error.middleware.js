import { ApiError } from "../utils/apiError.js";

export function errorHandler(err, req, res, _next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
    });
  }

  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      details: err.flatten(),
    });
  }

  if (err.code === "P2002") {
    return res.status(409).json({ success: false, message: "Resource already exists" });
  }

  const message = process.env.NODE_ENV === "production" ? "Internal server error" : err.message;
  return res.status(500).json({ success: false, message });
}