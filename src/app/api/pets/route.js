import { backendClient } from "@/config/axios";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await backendClient.get("/pets");
  return NextResponse.json(response.data);
}
