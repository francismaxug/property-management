import React from "react";
import { fetchProperties } from "@/utils/fetchResource";
import PropertySearchForm from "@/components/PropertySearchForm";
import Properties from "@/components/Properties";
const PropertyPage = async () => {
  const properties = await fetchProperties();

  return (
    <>
      <section className="px-4 bg-blue-700 py-7 mb-5">
        <div className=" flex flex-start max-w-7xl mx-auto flex-col px-4 sm:px-6 lg:-px-8">
          <PropertySearchForm />
        </div>
      </section>
     <Properties/>
    </>
  );
};

export default PropertyPage;
