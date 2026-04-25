import { getCollection } from "@/lib/mongodb/db";

export async function getNextSeriesId() {
  const counters = await getCollection("counters");

  const result = await counters.findOneAndUpdate(
    { _id: "series" },
    { $inc: { seq: 1 } },
    {
      upsert: true,
      returnDocument: "after",
    }
  );

  if (!result.value) {
    const created = await counters.findOne({ _id: "series" });
    return String(created?.seq || 1);
  }

  return String(result.value.seq);
}