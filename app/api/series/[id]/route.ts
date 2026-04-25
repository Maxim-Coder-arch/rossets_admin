import { getCollection } from "@/lib/mongodb/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Нет id" },
        { status: 400 }
      );
    }

    const collection = await getCollection("series");

    await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true });

  } catch {
    return NextResponse.json(
      { error: "Ошибка удаления" },
      { status: 500 }
    );
  }
}