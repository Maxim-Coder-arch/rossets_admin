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





// PUT /api/products — обновление по id из тела запроса
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: "Нет id" }, { status: 400 });
    }

    const collection = await getCollection("products");

    // Валидация
    if (!updateData.seriesId || !updateData.seriesNumber || !updateData.rossetDiameter || !updateData.price) {
      return NextResponse.json(
        { error: "Не заполнены обязательные поля" },
        { status: 400 }
      );
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { 
        $set: {
          image: updateData.image || "",
          additionalImages: updateData.additionalImages || [],
          seriesId: updateData.seriesId,
          seriesNumber: updateData.seriesNumber,
          rossetSeries: updateData.rossetSeries || "",
          rossetNumber: Number(updateData.rossetNumber) || 0,
          rossetDiameter: Number(updateData.rossetDiameter),
          numberOfTails: Number(updateData.numberOfTails),
          tailLength: Number(updateData.tailLength),
          comment: updateData.comment || "",
          price: Number(updateData.price),
          updatedAt: new Date(),
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Товар не найден" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Товар обновлён",
      product: { _id, ...updateData },
    });
  } catch (error) {
    console.error("PUT product error:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}