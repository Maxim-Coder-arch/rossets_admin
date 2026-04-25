import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";
import { ObjectId } from "mongodb";


// =====================
// GET — получить все декоры
// =====================
export async function GET() {
  try {
    const collection = await getCollection("decors");

    const decors = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ decors });
  } catch (error) {
    console.error("GET decors error:", error);

    return NextResponse.json(
      { error: "Ошибка получения декоров" },
      { status: 500 }
    );
  }
}


// =====================
// POST — создать декор
// =====================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      price,
      mainImage,
      additionalImages,
      additionalFields,
    } = body;

    if (!title || !price) {
      return NextResponse.json(
        { error: "title и price обязательны" },
        { status: 400 }
      );
    }

    const collection = await getCollection("decors");

    const newDecor = {
      title,
      description: description || "",
      price: Number(price),
      mainImage: mainImage || "",
      additionalImages: additionalImages || [],
      additionalFields: additionalFields || [],
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newDecor);

    return NextResponse.json({
      success: true,
      decor: {
        _id: result.insertedId,
        ...newDecor,
      },
    });
  } catch (error) {
    console.error("POST decors error:", error);

    return NextResponse.json(
      { error: "Ошибка создания декора" },
      { status: 500 }
    );
  }
}


// =====================
// DELETE — удалить декор по ObjectId
// =====================
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Нет id" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Невалидный ObjectId" },
        { status: 400 }
      );
    }

    const collection = await getCollection("decors");

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Декор не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE decors error:", error);

    return NextResponse.json(
      { error: "Ошибка удаления декора" },
      { status: 500 }
    );
  }
}