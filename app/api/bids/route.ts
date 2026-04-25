import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const withoutGoods = await getCollection("bid_without_goods");
    const withGoods = await getCollection("bid_with_goods");

    const [a, b] = await Promise.all([
      withoutGoods.find({}).toArray(),
      withGoods.find({}).toArray(),
    ]);

    const bids = [
      ...a.map((x) => ({ ...x, type: "without_goods" })),
      ...b.map((x) => ({ ...x, type: "with_goods" })),
    ];

    bids.sort((x, y) => +new Date(y.createdAt) - +new Date(x.createdAt));

    return NextResponse.json({ bids });

  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка получения заявок" },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "no id" }, { status: 400 });
    }

    const withoutGoods = await getCollection("bid_without_goods");
    const withGoods = await getCollection("bid_with_goods");

    // пробуем в первой коллекции
    let result = await withoutGoods.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    // если не найдено — во второй
    if (result.matchedCount === 0) {
      result = await withGoods.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "PATCH error" },
      { status: 500 }
    );
  }
}

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

    let collection;

    if (type === "without_goods") {
      collection = withoutGoods;
    } else {
      collection = withGoods;
    }

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "DELETE error" },
      { status: 500 }
    );
  }
}