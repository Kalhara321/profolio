import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(request: Request) {
  try {
    // Ensure uploads directory exists
    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json({ error: "No file provided." }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Clean extension
      const originalExt = path.extname(file.name) || ".png";
      const cleanExt = originalExt.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif|svg)/)
        ? originalExt.toLowerCase()
        : ".png";

      const filename = `image-${Date.now()}${cleanExt}`;
      const filePath = path.join(UPLOADS_DIR, filename);

      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json({ success: true, url: publicUrl, filename });
    }

    // Handle Base64 Upload Payload
    const body = await request.json();
    const { base64Data, filename: customName } = body;

    if (!base64Data) {
      return NextResponse.json({ error: "No image data provided." }, { status: 400 });
    }

    const matches = base64Data.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.json({ error: "Invalid base64 image data." }, { status: 400 });
    }

    const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
    const imageBuffer = Buffer.from(matches[2], "base64");
    const filename = `${customName || "upload"}-${Date.now()}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);

    await fs.writeFile(filePath, imageBuffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl, filename });
  } catch (error) {
    console.error("Error saving image to public/uploads/:", error);
    return NextResponse.json({ error: "Failed to save image file." }, { status: 500 });
  }
}
