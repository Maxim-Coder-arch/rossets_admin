import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";
import { getNextSeriesId } from "@/lib/seriesCounter";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { seriesTitle, image } = await req.json();

    if (!seriesTitle) {
      return NextResponse.json(
        { error: "Нет названия серии" },
        { status: 400 }
      );
    }

    const collection = await getCollection("series");

    const seriesId = await getNextSeriesId();

    const newSeries = {
      seriesId,
      seriesTitle,
      image: image || "",
      createdAt: new Date(),
    };

    await collection.insertOne(newSeries);

    return NextResponse.json({ success: true, series: newSeries });

  } catch (error) {
    console.error("Create series error:", error);

    return NextResponse.json(
      { error: "Ошибка создания серии" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const collection = await getCollection("series");

    const series = await collection
      .find({})
      .sort({ seriesId: 1 })
      .toArray();

    return NextResponse.json({ series });
  } catch {
    return NextResponse.json(
      { error: "Ошибка получения серий" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Нет id" }, { status: 400 });
    }

    const db = await getCollection("series");

    const series = await db.findOne({
      _id: new ObjectId(id),
    });

    if (!series) {
      return NextResponse.json({ error: "Series not found" }, { status: 404 });
    }

    const products = await getCollection("products");

    const result = await products.deleteMany({
      seriesId: series.seriesId,
    });

    await db.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      deletedProducts: result.deletedCount,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Ошибка удаления" },
      { status: 500 }
    );
  }
}