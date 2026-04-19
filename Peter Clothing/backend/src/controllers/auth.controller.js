import { prisma } from "../config/db.js";
import { env } from "../config/env.js";
import { ok } from "../utils/apiResponse.js";
import { catchAsync } from "../utils/catchAsync.js";
import { randomToken, sha256, verifyRefreshToken } from "../utils/jwt.js";
import { sendEmail } from "../utils/email.js";
import {
  clearRefreshTokenCookie,
  getRefreshTokenFromRequest,
  hashPassword,
  issueAuthTokens,
  revokeRefreshToken,
  verifyPassword,
} from "../services/auth.service.js";

export const register = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.validated.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ success: false, message: "Email already in use" });
  }

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: await hashPassword(password),
      phone,
    },
    select: { id: true, email: true },
  });

  const verificationToken = randomToken();
  await prisma.verificationToken.create({
    data: {
      userId: user.id,
      tokenHash: sha256(verificationToken),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  const verifyUrl = `${env.appOrigin}/verify-email?token=${verificationToken}`;
  await sendEmail({
    to: user.email,
    subject: "Verify your Peter Clothing account",
    html: `<p>Verify your account by clicking <a href="${verifyUrl}">this link</a>.</p>`,
  });

  return ok(res, { userId: user.id, email: user.email }, "Registration successful. Verify your email.", 201);
});

export const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.validated.body;
  const tokenHash = sha256(token);
  const record = await prisma.verificationToken.findFirst({
    where: { tokenHash, usedAt: null, expiresAt: { gt: new Date() } },
  });

  if (!record) {
    return res.status(400).json({ success: false, message: "Invalid or expired verification token" });
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { emailVerified: true } }),
    prisma.verificationToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);

  return ok(res, null, "Email verified successfully");
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.validated.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.password))) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  if (!user.emailVerified) {
    return res.status(403).json({ success: false, message: "Please verify your email first" });
  }

  const { accessToken } = await issueAuthTokens({ user, req, res });
  return ok(
    res,
    {
      accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    },
    "Login successful"
  );
});

export const refresh = catchAsync(async (req, res) => {
  const refreshToken = getRefreshTokenFromRequest(req);
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: "Missing refresh token" });
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return res.status(401).json({ success: false, message: "Invalid refresh token" });
  }

  const tokenInDb = await prisma.refreshToken.findFirst({
    where: {
      tokenHash: sha256(refreshToken),
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
  });

  if (!tokenInDb) {
    return res.status(401).json({ success: false, message: "Refresh token revoked" });
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }

  await revokeRefreshToken(refreshToken);
  const tokens = await issueAuthTokens({ user, req, res });
  return ok(res, tokens, "Token refreshed");
});

export const logout = catchAsync(async (req, res) => {
  const refreshToken = getRefreshTokenFromRequest(req);
  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }
  clearRefreshTokenCookie(res);
  return ok(res, null, "Logged out");
});

export const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.validated.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const resetToken = randomToken();
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: sha256(resetToken),
        expiresAt: new Date(Date.now() + 1000 * 60 * 30),
      },
    });

    const resetUrl = `${env.appOrigin}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: "Reset your Peter Clothing password",
      html: `<p>Reset your password using <a href="${resetUrl}">this secure link</a>.</p>`,
    });
  }

  return ok(res, null, "If the email exists, a reset link was sent");
});

export const resetPassword = catchAsync(async (req, res) => {
  const { token, password } = req.validated.body;
  const tokenHash = sha256(token);

  const record = await prisma.passwordResetToken.findFirst({
    where: { tokenHash, usedAt: null, expiresAt: { gt: new Date() } },
  });

  if (!record) {
    return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { password: await hashPassword(password) } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
    prisma.refreshToken.updateMany({ where: { userId: record.userId, revokedAt: null }, data: { revokedAt: new Date() } }),
  ]);

  return ok(res, null, "Password reset successfully");
});

export const me = catchAsync(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return ok(res, user);
});