import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";
import { ObjectId } from "mongodb";

/* ---------------- GET ---------------- */
export async function GET() {
  try {
    const collection = await getCollection("reviews");

    const reviews = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ reviews });

  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка получения отзывов" },
      { status: 500 }
    );
  }
}

/* ---------------- POST ---------------- */
export async function POST(req: Request) {
  try {
    const { name, rating, text } = await req.json();

    if (!name || !text) {
      return NextResponse.json(
        { error: "Нет обязательных полей" },
        { status: 400 }
      );
    }

    const collection = await getCollection("reviews");

    const newReview = {
      name,
      rating: Number(rating),
      text,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newReview);

    return NextResponse.json({
      ...newReview,
      _id: result.insertedId,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка создания отзыва" },
      { status: 500 }
    );
  }
}

/* ---------------- DELETE ---------------- */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Нет id" },
        { status: 400 }
      );
    }

    const collection = await getCollection("reviews");

    await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка удаления" },
      { status: 500 }
    );
  }
}