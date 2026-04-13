import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
} from "firebase-admin/app";
import { getMessaging, type Messaging } from "firebase-admin/messaging";

function getFirebaseAdmin() {
  if (getApps().length > 0) return getApps()[0];

  // Option 1: Base64-encoded service account (for production/Vercel)
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (base64) {
    const sa = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
    return initializeApp({ credential: cert(sa) });
  }

  // Option 2: Service account JSON file
  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (filePath) {
    return initializeApp({ credential: cert(filePath) });
  }

  // Option 3: Application Default Credentials (gcloud auth application-default login)
  return initializeApp({
    credential: applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID ?? "friendly-vigil-486721-d2",
  });
}

export function getAdminMessaging(): Messaging {
  return getMessaging(getFirebaseAdmin());
}
