"use client";
import PropertyEditForm from "@/components/PropertyEditForm";
import { Property } from "@/lib/types";
import Loading from "@/app/loading";

import { fetchSingleProperty } from "@/utils/fetchResource";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const Edit = () => {
  const { id } = useParams();
  // const [isLoading, setIsLoading] = useState(false);
  const [find, setFind] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!id) return;
        setIsLoading(true);
        const property = await fetchSingleProperty(id);
        console.log(property);
        setFind(property);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (find === null) {
      fetchProperty();
    }
  }, [id, find]);

  if (isLoading) return <Loading />;
  // if (!find && !isLoading)
  //   return (
  //     <div className=" text-center text-2xl mt-10 font-bold">
  //       Property not found
  //     </div>
  //   );

  return (
    <>
      {!find && !isLoading && (  <div className=" text-center text-2xl mt-10 font-bold">
        Property not found
      </div>)}
      <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <PropertyEditForm singleProperty={find} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Edit;
