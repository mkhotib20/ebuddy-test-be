import { BaseApp } from "@/entities/BaseApp";
import { BaseService } from "@/entities/BaseService";
import { PostEntity } from "@/entities/PostEntity";
import { PostRepository } from "@/repository/Post";

/**
 * Based on Clean code architecture, Service used for main business logic
 */
class PostService extends BaseService {
  private readonly postRepo: PostRepository;

  constructor(app: BaseApp) {
    super(app);
    this.postRepo = new PostRepository(app.db);
  }

  fetchHomePagePost = async (limit = 10, page = 1) => {
    const posts = await this.postRepo.fetchData(limit, page);
    return posts;
  };

  createData = async (postData: PostEntity) => {
    return this.postRepo.createData(postData);
  };
}

export default PostService;
