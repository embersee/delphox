import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBot,
  deleteBot,
  updateBot,
} from "@/lib/api/bots/mutations";
import { 
  botIdSchema,
  insertBotParams,
  updateBotParams 
} from "@/lib/db/schema/bots";

export async function POST(req: Request) {
  try {
    const validatedData = insertBotParams.parse(await req.json());
    const { success, error } = await createBot(validatedData);
    if (error) return NextResponse.json({ error }, { status: 500 });
    revalidatePath("/bots"); // optional - assumes you will have named route same as entity
    return NextResponse.json(success, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateBotParams.parse(await req.json());
    const validatedParams = botIdSchema.parse({ id });

    const { success, error } = await updateBot(validatedParams.id, validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = botIdSchema.parse({ id });
    const { success, error } = await deleteBot(validatedParams.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
