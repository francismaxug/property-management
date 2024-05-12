import { NextRequest, NextResponse } from "next/server";
import BookMarksModel from "@/models/Bookmarks";
import { auth } from "@/auth";
import ConnectDB from "@/config/database";
import PropertyModel from "@/models/Property";

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
          message: "User not found",
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
          message: "User not found",
        }),
        { status: 401 }
      );
    }

    let isbookmarks = user.bookmarks.includes(propertyId);
    let message;

    if (isbookmarks) {
      user.isbookmarks = user.bookmarks.pull(propertyId);
      message = "Property removed from bookmarks";
      isbookmarks = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Property bookmarked successfully";
      isbookmarks = true;
    }

    await user.save();
    return new NextResponse(JSON.stringify({ message, isbookmarks }), {
      status: 200,
    });
    // if (user.bookmarks.includes(propertyId)) {
    //   return new NextResponse(
    //     JSON.stringify({
    //       message: "Property already bookmarked",
    //     }),
    //     { status: 400 }
    //   );
    // } else {
    //   user.bookmarks.push(propertyId);
    //   await user.save();
    //   return new NextResponse(
    //     JSON.stringify({
    //       message: "Property bookmarked successfully",
    //     }),
    //     { status: 200 }
    //   );
    // }
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await ConnectDB();
    const session = await auth();
    if (!session || !session.user?.name) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 401 }
      );
    }

    const user = await BookMarksModel.findOne({ user: session?.user.name });
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 401 }
      );
    }
    const bookmarks = await PropertyModel.find({
      _id: { $in: user.bookmarks },
    });

    return new NextResponse(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("something went wrong", { status: 500 });
  }
};
