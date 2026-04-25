import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";

function getStartDate(period: string) {
  const now = new Date();
  const start = new Date();

  switch (period) {
    case "day":
      start.setDate(now.getDate() - 1);
      break;
    case "week":
      start.setDate(now.getDate() - 7);
      break;
    case "month":
      start.setMonth(now.getMonth() - 1);
      break;
    case "year":
      start.setFullYear(now.getFullYear() - 1);
      break;
    default:
      start.setDate(now.getDate() - 1);
  }

  return start;
}

export async function GET() {
  try {
    const collection = await getCollection("tracking");

    const periods = ["day", "week", "month", "year"] as const;

    const results: Record<string, number> = {};

    for (const period of periods) {
      const startDate = getStartDate(period);

      const uniqueVisitors = await collection.distinct("visitorId", {
        timestamp: { $gte: startDate },
      });

      results[period] = uniqueVisitors.length;
    }

    return NextResponse.json({
      users: results,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Ошибка получения статистики" },
      { status: 500 }
    );
  }
}