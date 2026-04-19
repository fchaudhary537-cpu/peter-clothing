import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { isProd } from "../config/env.js";
import { randomToken, sha256, signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

const REFRESH_COOKIE_NAME = "pc_refresh";

export async function issueAuthTokens({ user, req, res }) {
  const jti = randomToken(16);
  const payload = { sub: user.id, role: user.role, jti };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const decoded = verifyRefreshToken(refreshToken);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: sha256(refreshToken),
      userAgent: req.headers["user-agent"] ?? "",
      ipAddress: req.ip,
      expiresAt: new Date(decoded.exp * 1000),
    },
  });

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken };
}

export async function revokeRefreshToken(refreshToken) {
  await prisma.refreshToken.updateMany({
    where: { tokenHash: sha256(refreshToken), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export function getRefreshTokenFromRequest(req) {
  return req.cookies?.[REFRESH_COOKIE_NAME] ?? req.body?.refreshToken ?? "";
}

export function clearRefreshTokenCookie(res) {
  res.clearCookie(REFRESH_COOKIE_NAME);
}