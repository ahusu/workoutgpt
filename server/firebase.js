import admin from "firebase-admin";
import serviceAccount from './serviceAccount.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function postFitnessPlan(fitnessPlan) {
  try {
    const fitnessPlansCol = db.collection("Users");
    const docRef = await fitnessPlansCol.add(fitnessPlan);
    console.log(`Document written with ID: ${docRef.id}`);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

export { db, postFitnessPlan };
