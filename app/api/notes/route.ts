import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";
import { ObjectId } from "mongodb";


export async function GET() {
  try {
    const collection = await getCollection("notes");

    const notes = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Get notes error:", error);
    return NextResponse.json({ error: "Ошибка получения заметок" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Текст обязателен" }, { status: 400 });
    }

    const collection = await getCollection("notes");

    const newNote = {
      text,
      completed: false,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newNote);

    return NextResponse.json({
      note: {
        _id: result.insertedId,
        ...newNote,
      },
    });
  } catch (error) {
    console.error("Create note error:", error);
    return NextResponse.json({ error: "Ошибка создания заметки" }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID обязателен" }, { status: 400 });
    }

    const collection = await getCollection("notes");

    await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete note error:", error);
    return NextResponse.json({ error: "Ошибка удаления заметки" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, completed } = await request.json();

    const collection = await getCollection("notes");

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update note error:", error);
    return NextResponse.json({ error: "Ошибка обновления заметки" }, { status: 500 });
  }
}