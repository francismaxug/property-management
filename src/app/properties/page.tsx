import React from "react";
import properties from "@/app/properties.json";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
const PropertyPage = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <div className="text-center">No properties found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
      <Pagination/>
    </section>
  );
};

export default PropertyPage;
