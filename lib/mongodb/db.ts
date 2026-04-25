import clientPromise from ".";

export async function getDB() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "rosettes");
}

export async function getCollection(name: string) {
  const db = await getDB();
  return db.collection(name);
}

export const getSeriesCollection = () => getCollection("series");
export const getRossetsCollection = () => getCollection("rossets");
export const getLeadsCollection = () => getCollection("leads");
export const getReviewsCollection = () => getCollection("reviews");