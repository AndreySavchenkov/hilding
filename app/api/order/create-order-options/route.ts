// app/api/todo/create/route.ts

import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderOptions } = await req.json();

    if (!orderOptions) {
      return new NextResponse("orderOptions required", { status: 400 });
    }

    //Create and save todo on the database
    const options = await db.orderOptions.create({
      data: { ...orderOptions },
    });

    return NextResponse.json(options, { status: 200 }); // Respond with the created todo
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
