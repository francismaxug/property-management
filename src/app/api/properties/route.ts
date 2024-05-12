import ConnectDB from "@/config/database";
import PropertyModel from "@/models/Property";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";

export const GET = async (request: NextRequest) => {
  await ConnectDB();
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 3;

    const skip = (page - 1) * limit;

    const countTotal = await PropertyModel.countDocuments();

    const property = await PropertyModel.find({}).skip(skip).limit(limit);

    const results = {
      countTotal,
      property,
    };

    return new NextResponse(JSON.stringify(results), { status: 200 });
  } catch (error) {}
  return new NextResponse("Internal Server Error", { status: 500 });
};

export const POST = async (request: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // console.log(session.user.name);
    const user = session.user?.name;
    await ConnectDB();
    const formData = await request.formData();
    //Access all values from amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => (image as File).name !== "");

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
    const imageuploads: string[] = [];

    for (const image of images) {
      const imageBuffer = await (image as File).arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //convert image to base64
      const tobase64 = imageData.toString("base64");

      //make a request to upload to cloudinary
      const upload = await cloudinary.uploader.upload(
        `data:image/png;base64,${tobase64}`,
        {
          folder: "propertypulse",
        }
      );
      imageuploads.push(upload.secure_url);

      //wait for all images to upload
      const uploaded = await Promise.all(imageuploads);

      propertyData.images = uploaded;
    }

    const newProperty = new PropertyModel(propertyData);
    await newProperty.save();
    console.log("ok");
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
    // return new NextResponse(JSON.stringify({ message: "success" }), {
    //   status: 201,
    // });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something Went Wrong", { status: 500 });
  }
};
function parseString(arg0: string | null) {
  throw new Error("Function not implemented.");
}
