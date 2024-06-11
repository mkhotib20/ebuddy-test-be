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

  fetchData = async () => {
    const snapshot = await this.db
      .collection("POSTS")
      .orderBy("timestamp", "desc")
      .get();

    const posts: any[] = [];
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
