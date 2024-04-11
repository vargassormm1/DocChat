import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req, res) => {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const filename = file.name.replaceAll(" ", "_");

  try {
    // Write the file to the specified directory (public/uploads) with the modified filename
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    // Return a JSON response with a success message and a 201 status code
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
