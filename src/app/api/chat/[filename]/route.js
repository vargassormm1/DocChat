import { NextResponse } from "next/server";
import { getResponse } from "@/utils/ai";

export const POST = async (request, { params }) => {
  const data = await request.json();
  const response = await getResponse(params.filename, data);
  return NextResponse.json({ data: response });
};
