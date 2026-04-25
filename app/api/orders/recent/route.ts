import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb/db";

export async function GET() {
  try {
    const db = await getDB();

    const results = await db.collection("bid_without_goods").aggregate([
      {
        $match: { status: "new" },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
        },
      },
      {
        $unionWith: {
          coll: "bid_with_goods",
          pipeline: [
            {
              $match: { status: "new" },
            },
            {
              $project: {
                name: 1,
                createdAt: 1,
              },
            },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 5,
      },
    ]).toArray();

    return NextResponse.json({ orders: results });
  } catch (error) {
    console.error("Orders error:", error);
    return NextResponse.json(
      { error: "Ошибка получения заявок" },
      { status: 500 }
    );
  }
}