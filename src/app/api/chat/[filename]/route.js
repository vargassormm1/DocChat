import { NextResponse } from "next/server";
import { getResponse } from "@/utils/ai";

export const POST = async (request, { params }) => {
  try {
    const data = await request.json();

    if (!data) {
      throw new Error("Invalid request data");
    }

    const response = await getResponse(params.filename, data);
    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
