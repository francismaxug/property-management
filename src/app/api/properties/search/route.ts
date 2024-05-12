import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/config/database";
import PropertyModel from "@/models/Property";

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    await ConnectDB();
    const searchParams = request.nextUrl.searchParams;
    // console.log(searchParams);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertytype");

    const locationPartern = new RegExp(location ?? "", "i");

    let query = {
      type: RegExp(".*"),
      $or: [
        {
          name: locationPartern,
        },
        {
          discription: locationPartern,
        },
        {
          "location.street": locationPartern,
        },
        {
          "location.zipcode": locationPartern,
        },
        {
          "location.state": locationPartern,
        },
        {
          "location.city": locationPartern,
        },
      ],
    };

    if (propertyType && propertyType !== "All") {
      const typePartern = new RegExp(propertyType, "i");
      query.type = typePartern;
    }

    const properties = await PropertyModel.find(query);
    // console.log(properties);
    return new NextResponse(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
