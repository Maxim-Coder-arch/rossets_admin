import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";

export async function GET() {
  try {
    const collection = await getCollection("products");

    const count = await collection.countDocuments();

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Products count error:", error);
    return NextResponse.json(
      { error: "Ошибка получения количества товаров" },
      { status: 500 }
    );
  }
}