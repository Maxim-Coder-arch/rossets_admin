import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const collection = await getCollection("products");

    const products = await collection.find({}).toArray();

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Products error:", error);
    return NextResponse.json(
      { error: "Ошибка получения товаров" },
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

    const collection = await getCollection("products");

    await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Ошибка удаления" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      image,
      additionalImages,
      seriesId,
      seriesNumber,
      rossetSeries,
      rossetNumber,
      rossetDiameter,
      numberOfTails,
      tailLength,
      comment,
      price,
    } = body;

    if (!seriesId || !seriesNumber || !rossetDiameter || !price) {
      return NextResponse.json(
        { error: "Не заполнены обязательные поля" },
        { status: 400 }
      );
    }

    const collection = await getCollection("products");

    const newProduct = {
      image: image || "",
      additionalImages: additionalImages || [],
      seriesId,
      seriesNumber,
      rossetSeries: rossetSeries || "",
      rossetNumber: Number(rossetNumber) || 0,
      rossetDiameter: Number(rossetDiameter),
      numberOfTails: Number(numberOfTails),
      tailLength: Number(tailLength),
      comment: comment || "",
      price: Number(price),

      createdAt: new Date(),
    };

    const result = await collection.insertOne(newProduct);

    return NextResponse.json({
      success: true,
      product: {
        _id: result.insertedId,
        ...newProduct,
      },
    });
  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      { error: "Ошибка создания товара" },
      { status: 500 }
    );
  }
}