import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req, res) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const filename = file.name.replaceAll(" ", "_");

    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    return NextResponse.json({
      Message: "File uploaded successfully.",
      status: 201,
    });
  } catch (error) {
    console.log("Error occurred during file upload:", error);
    return NextResponse.json({
      Message: "Failed to upload file.",
      status: 500,
    });
  }
};
