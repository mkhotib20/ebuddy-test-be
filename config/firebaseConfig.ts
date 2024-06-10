import serviceAccount from "@/credential.json";
import admin, { credential } from "firebase-admin";

const configureFirebase = () => {
  admin.initializeApp({
    credential: credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
  });

  return {
    db: admin.firestore(),
    auth: admin.auth(),
  };
};

export default configureFirebase;
