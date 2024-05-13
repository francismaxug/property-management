import ConnectDB from "@/config/database";
import PropertyModel from "@/models/Property";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await ConnectDB();
  try {
  
    const property = await PropertyModel.find({
      is_featured: true,
    });

   

    return new NextResponse(JSON.stringify(property), { status: 200 });
  } catch (error) {}
  return new NextResponse("Internal Server Error", { status: 500 });
};
