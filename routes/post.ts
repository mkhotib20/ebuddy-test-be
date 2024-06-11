import { PostController } from "@/controller/Post";
import type { BaseRouteOption } from "@/entities/BaseRouteOption";
import { AuthMiddleware } from "@/middleware/Auth";
import asyncHandler from "express-async-handler";

const postRoutes = (app: BaseRouteOption) => {
  const { server } = app;

  const postController = new PostController(app);
  const authMiddleware = new AuthMiddleware(app);

  server.get(
    "/homepage-post",
    asyncHandler(postController.handleFetchHomepagePost)
  );
  server.post(
    "/insert-post",
    asyncHandler(authMiddleware.authenticated),
    asyncHandler(postController.handleCreatePost)
  );
};

export default postRoutes;
