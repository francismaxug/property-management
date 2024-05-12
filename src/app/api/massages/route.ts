import ConnectDB from "@/config/database";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import Message from "@/models/Messages";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest, response: NextResponse) => {
  const { name, email, phone, message, property, recepient } =
    await request.json();

  try {
    const session = await auth();

    if (!session || !session?.user?.name) {
      return new NextResponse(
        "You need to be logged in to use this functionality",
        {
          status: 401,
        }
      );
    }

    await ConnectDB();

    if (session?.user?.name === recepient) {
      return new NextResponse(
        JSON.stringify({ message: "You cannot send message to yourself" }),
        {
          status: 400,
        }
      );
    }
    const newMessage = new Message({
      sender: session?.user?.name,
      name,
      email,
      phone,
      body: message,
      property,
      recepient,
    });
    await newMessage.save();

    return new NextResponse(JSON.stringify("Message sent"), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Something went wrong"), {
      status: 500,
    });
  }
};

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const session = await auth();

    if (!session || !session?.user?.name) {
      return new NextResponse(
        "You need to be logged in to use this functionality",
        {
          status: 401,
        }
      );
    }
    await ConnectDB();

    const messages = await Message.find({ recepient: session?.user?.name });

    return new NextResponse(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Something went wrong"), {
      status: 500,
    });
  }
};
