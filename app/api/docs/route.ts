import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "swagger.yaml");
    const fileContents = await fs.readFile(filePath, "utf8");

    return new NextResponse(fileContents, {
      status: 200,
      headers: { "Content-Type": "text/yaml" },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error loading Swagger file", error: error.message },
      { status: 500 }
    );
  }
}
