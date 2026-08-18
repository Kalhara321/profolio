import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolioData.json");

export async function GET() {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading portfolioData.json:", error);
    return NextResponse.json({ error: "Failed to read portfolio data." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid data payload." }, { status: 400 });
    }

    // Save JSON formatted with 2 spaces
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true, message: "Portfolio details saved to text file successfully." });
  } catch (error) {
    console.error("Error writing portfolioData.json:", error);
    return NextResponse.json({ error: "Failed to write portfolio data." }, { status: 500 });
  }
}
