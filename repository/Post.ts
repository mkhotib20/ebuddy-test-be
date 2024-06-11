import { BaseRepository } from "@/entities/BaseRepository";
import { PostEntity } from "@/entities/PostEntity";
import dayjs from "dayjs";
import { firestore } from "firebase-admin";

/**
 * Based on Clean code architecture, repository is used to fetch, mutate external data source
 */
export class PostRepository extends BaseRepository {
  constructor(db: firestore.Firestore) {
    super(db);
  }

  fetchData = async (limit = 10, page = 1) => {
    const offset = (page - 1) * limit;
    const snapshot = await this.db
      .collection("POSTS")
      .orderBy("timestamp", "desc")
      .limit(limit)
      .offset(offset)
      .get();

    const posts: any[] = [];
    console.log(snapshot.size);

    snapshot.forEach((doc) => {
      posts.push(doc.data());
    });

    return posts;
  };

  createData = async (postData: PostEntity) => {
    const timestamp = dayjs().toISOString();
    const postRef = this.db.collection("POSTS");

    const result = await postRef.add({
      ...postData,
      updatedAt: timestamp,
      createdAt: timestamp,
    });
    return result;
  };
}
