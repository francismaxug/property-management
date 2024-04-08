import ConnectDB from "@/config/database";
import PropertyModel from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  await ConnectDB()
  try {
    const singleProperty = await PropertyModel.findById(params.id);

    return new NextResponse(JSON.stringify(singleProperty), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Property Not Found" },
      {
        status: 404,
      }
    );
  }
};
