import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = () => {
  try {
    cookies().delete("user");

    return NextResponse.json({});
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
    });
  }
};
