"use client";
import React, { Suspense } from "react";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import { useState, useEffect } from "react";
import { Property } from "@/lib/types";
const FeaturedProperties = () => {
  const [property, setProperty] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`/api/properties/featured`);
        if (!res.ok)
          throw new Error("An error occurred while fetching the data");

        const data = await res.json();
        setProperty(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperties();
  }, []);

  if (property.length === 0) return null;
  return (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {property.map((property) => (
              <div key={property._id}>
                <FeaturedPropertyCard property={property} />
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </section>
  );
};

export default FeaturedProperties;
