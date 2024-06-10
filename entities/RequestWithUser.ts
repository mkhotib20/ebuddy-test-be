import type { Request } from "express";
import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export interface RequestWithUser extends Request {
  user?: DecodedIdToken;
}
