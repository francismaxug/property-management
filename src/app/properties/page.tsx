import React from "react";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
import { fetchProperties } from "@/utils/fetchResource";
const PropertyPage = async () => {
  const properties = await fetchProperties();
  const sortProperties = properties?.slice().sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {sortProperties?.length === 0 ? (
          <div className="text-center">No properties found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortProperties?.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
      <Pagination />
    </section>
  );
};

export default PropertyPage;
