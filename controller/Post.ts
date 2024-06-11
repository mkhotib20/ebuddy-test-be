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

  handleFetchHomepagePost = async (req: RequestWithUser, res: Response) => {
    const page = parseInt(req.query["page"]?.toString() || "1", 10);
    const limit = parseInt(req.query["limit"]?.toString() || "10", 10);

    const posts = await this.postService.fetchHomePagePost(limit + 1, page);
    console.log(posts.length, limit);

    const hasNext = posts.length > limit;

    if (hasNext) {
      posts.pop();
    }

    res.send({
      data: posts,
      hasNext,
    });
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
