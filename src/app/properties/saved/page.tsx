"use client";
import Loading from "@/app/loading";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const SavedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/bookmarks");
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.error("Error fetching properties: ", response.statusText);
          toast.error("Error fetching properties");
        }
      } catch (error) {
        console.error("Error fetching properties: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  console.log(properties);
  return loading ? (
    <Loading />
  ) : (
    <section className="px-4 py-6">
      <h1 className=" text-2xl mb-4">Saved Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties?.length === 0 ? (
          <div className="text-center">No Saved Properties found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.map((propertyy) => (
              <PropertyCard key={propertyy._id} property={propertyy} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
