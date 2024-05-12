import ConnectDB from "@/config/database";
import PropertyModel from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
export const GET = async (request: NextRequest) => {
  const session = await auth();
  const owner = session?.user?.name;
  await ConnectDB();
  console.log("ok");
  try {
    const property = await PropertyModel.find({ owner: owner });
    if (!property) {
      return new NextResponse(
        JSON.stringify({
          message:
            "You have no listings yet, click add properties to create one",
        }),
        { status: 401 }
      );
    }
    return new NextResponse(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
