import ConnectDB from "@/config/database";
import PropertyModel from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

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
  await ConnectDB();
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

export const DELETE = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  await ConnectDB();
  try {
    await PropertyModel.findByIdAndDelete(params.id);

    return new NextResponse(
      JSON.stringify({ message: "Item deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete Property" },
      {
        status: 404,
      }
    );
  }
};

export const PUT = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // console.log(session.user.name);
    const user = session.user?.name;
    await ConnectDB();
    const formData = await request.formData();
    console.log(formData);
    //Access all values from amenities and images
    const amenities = formData.getAll("amenities");

    //create property object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: user,
      images: [""],
    };
    //upload images to cloudinary

    await PropertyModel.findByIdAndUpdate(params.id, propertyData, {
      new: true,
    });

    console.log("ok");

    return new NextResponse(
      JSON.stringify({ message: "Updated Successfully" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Something Went Wrong", { status: 500 });
  }
};
