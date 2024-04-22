import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const POST = async (req, res) => {
  if (req.method === "POST") {
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

      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `uploads/${filename}`,
        Body: buffer,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

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
  } else {
    return NextResponse.error({ status: 405, message: "Method Not Allowed" });
  }
};
