import { BadRequestError } from "@/entities/BadRequest";
import { BaseApp } from "@/entities/BaseApp";
import { BaseController } from "@/entities/BaseController";
import { InternalError } from "@/entities/InternalError";
import { RequestWithUser } from "@/entities/RequestWithUser";
import { Unauthorized } from "@/entities/Unauthorized";
import UserService from "@/services/User";
import parseError from "@/utils/parseError";
import type { Response } from "express";

/**
 * Based on Clean code architecture, Controller is used to parse request and prepare response
 */
export class UserController extends BaseController {
  userService: UserService;

  constructor(app: BaseApp) {
    super(app);
    this.userService = new UserService(app);
  }

  handleFetchUserData = async (req: RequestWithUser, res: Response) => {
    const userData = req.user;
    try {
      const user = await this.userService.fetchUserData(userData?.email || "");
      res.send({ data: user });
    } catch (error) {
      throw new InternalError(parseError(error));
    }
  };

  handleUpdateUserData = async (req: RequestWithUser, res: Response) => {
    const userData = req.user;
    if (!userData) {
      throw new Unauthorized("You need to login to access this resource");
    }

    try {
      const { name: newName } = req.body || {};
      if (!newName) {
        throw new BadRequestError("Name is mandatory!");
      }

      const user = await this.userService.updateUserData({
        name: newName,
        email: userData.email || "",
      });

      res.send({ data: user });
    } catch (error) {
      throw new InternalError(parseError(error));
    }
  };
}
