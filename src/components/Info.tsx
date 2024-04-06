import React from "react";
import InfoBoxes from "./InfoBoxes";

const InfoSection = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBoxes
            heading="For Rentals"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBoxes>
          <InfoBoxes
            heading="For Property Owners"
            backkgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBoxes>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
