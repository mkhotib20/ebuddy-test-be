import { BaseApp } from "@/entities/BaseApp";
import { Response } from "express";

import { BaseController } from "@/entities/BaseController";
import { PostEntity } from "@/entities/PostEntity";
import { RequestWithUser } from "@/entities/RequestWithUser";
import PostService from "@/services/Post";

export class PostController extends BaseController {
  private readonly postService: PostService;

  constructor(baseApp: BaseApp) {
    super(baseApp);

    this.postService = new PostService(baseApp);
  }

  handleFetchHomepagePost = async (_: unknown, res: Response) => {
    const posts = await this.postService.fetchHomePagePost();

    res.send({ data: posts });
  };

  handleCreatePost = async (req: RequestWithUser, res: Response) => {
    const requestBody: PostEntity = req.body;
    const userData = req.user;

    requestBody.authorEmail = userData?.email;
    requestBody.name = userData?.name;
    requestBody.pictureUrl = userData?.picture || "";

    const posts = await this.postService.createData({ ...requestBody });

    res.send({ data: posts });
  };
}
