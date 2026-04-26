// app/api/bids/route.ts
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";
import { ObjectId } from "mongodb";

// GET /api/bids — получить все заявки (с декором тоже)
export async function GET() {
  try {
    const withoutGoods = await getCollection("bid_without_goods");
    const withGoods = await getCollection("bid_with_goods");
    const withDecor = await getCollection("bid_with_decor");

    const [a, b, c] = await Promise.all([
      withoutGoods.find({}).toArray(),
      withGoods.find({}).toArray(),
      withDecor.find({}).toArray(),
    ]);

    const bids = [
      ...a.map((x) => ({ ...x, type: "without_goods" })),
      ...b.map((x) => ({ ...x, type: "with_goods" })),
      ...c.map((x) => ({ ...x, type: "with_decor" })),
    ];

    bids.sort((x, y) => +new Date(y.createdAt) - +new Date(x.createdAt));

    return NextResponse.json({ bids });
  } catch (error) {
    console.error("GET bids error:", error);
    return NextResponse.json(
      { error: "Ошибка получения заявок" },
      { status: 500 }
    );
  }
}

// PATCH /api/bids — обновить статус заявки
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "no id" }, { status: 400 });
    }

    const withoutGoods = await getCollection("bid_without_goods");
    const withGoods = await getCollection("bid_with_goods");
    const withDecor = await getCollection("bid_with_decor");

    // Пробуем в первой коллекции
    let result = await withoutGoods.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    // Если не найдено — во второй
    if (result.matchedCount === 0) {
      result = await withGoods.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );
    }

    // Если не найдено — в третьей
    if (result.matchedCount === 0) {
      result = await withDecor.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );
    }

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Заявка не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Ошибка обновления статуса" },
      { status: 500 }
    );
  }
}

// DELETE /api/bids — удалить заявку
export async function DELETE(req: Request) {
  try {
    const { id, type } = await req.json();

    if (!id || !type) {
      return NextResponse.json(
        { error: "no id or type" },
        { status: 400 }
      );
    }

    const withoutGoods = await getCollection("bid_without_goods");
    const withGoods = await getCollection("bid_with_goods");
    const withDecor = await getCollection("bid_with_decor");

    let collection;

    switch (type) {
      case "without_goods":
        collection = withoutGoods;
        break;
      case "with_goods":
        collection = withGoods;
        break;
      case "with_decor":
        collection = withDecor;
        break;
      default:
        return NextResponse.json(
          { error: "Неверный тип заявки" },
          { status: 400 }
        );
    }

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Заявка не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Ошибка удаления заявки" },
      { status: 500 }
    );
  }
}