import { AUTH_COOKIE_NAME } from "@/config/authConfig";
import { BaseApp } from "@/entities/BaseApp";
import { BaseMiddleware } from "@/entities/BaseMiddleware";
import { RequestWithUser } from "@/entities/RequestWithUser";
import { Unauthorized } from "@/entities/Unauthorized";
import { AuthService } from "@/services/Auth";
import { NextFunction } from "express";

export class AuthMiddleware extends BaseMiddleware {
  private readonly authService: AuthService;
  constructor(baseApp: BaseApp) {
    super(baseApp);
    this.authService = new AuthService(baseApp);
  }

  authenticated = async (
    req: RequestWithUser,
    _: unknown,
    next: NextFunction
  ) => {
    const cookie = req.cookies[AUTH_COOKIE_NAME];

    if (!cookie) {
      throw new Unauthorized(
        "Unauthorized, you cannot access protected resource!"
      );
    }
    try {
      const userResult = await this.authService.validateUser(cookie);
      req.user = userResult;
    } catch (error) {
      console.error(error);

      throw new Unauthorized(
        "Unauthorized, you cannot access protected resource!"
      );
    } finally {
      next();
    }
  };
}
