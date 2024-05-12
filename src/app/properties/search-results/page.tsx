"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/app/loading";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/lib/types";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Link from "next/link";
import PropertySearchForm from "@/components/PropertySearchForm";
const SearchPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertytype");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertytype=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [location, propertyType]);
  // console.log(properties);
  return (
    <>
      <section className="px-4 bg-blue-700 pb-7">
        <div className=" flex flex-start max-w-7xl mx-auto flex-col px-4 sm:px-6 lg:-px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Loading />
      ) : (
        <section className="px-4 py-6">
          <Link
            href="/properties"
            className=" hover:underline mb-3 flex items-center text-blue-500"
          >
            <FaArrowAltCircleLeft className=" mr-2 mb-1" /> Back to properties
          </Link>
          <h1 className=" text-2xl mb-4">Search Results</h1>

          <div className="container-xl lg:container m-auto px-4 py-6">
            {properties?.length === 0 ? (
              <div className="text-center">No Properties found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties?.map((propertyy) => (
                  <PropertyCard key={propertyy._id} property={propertyy} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchPage;
