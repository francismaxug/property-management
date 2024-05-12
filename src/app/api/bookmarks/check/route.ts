import { NextRequest, NextResponse } from "next/server";
import BookMarksModel from "@/models/Bookmarks";
import { auth } from "@/auth";
import ConnectDB from "@/config/database";

export const dynamic = "force-dynamic";
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    // const { id } = req.query;
    console.log("ok");
    await ConnectDB();
    const { propertyId } = await req.json();
    console.log(propertyId);
    const session = await auth();
    if (!session || !session.user?.name) {
      return new NextResponse(
        JSON.stringify({
          message: "You must login to acess this functionality",
        }),
        { status: 401 }
      );
    }

    const user = await BookMarksModel.findOne({ user: session?.user.name });
    // console.log(session?.user.name);
    // console.log(user);
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "You must login to acess this functionality",
        }),
        { status: 401 }
      );
    }

    let isbookmarks = user.bookmarks.includes(propertyId);

    return new NextResponse(JSON.stringify({ isbookmarks }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
