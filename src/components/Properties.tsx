"use client"
import React from "react";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import { Property } from "@/lib/types";

const Properties = () => {
  // const sortProperties = properties?.slice().sort((a, b) => {
  //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  // });
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`/api/properties?page=${page}&limit=${limit}`);
        if(!res.ok) throw new Error("An error occurred while fetching the data");

        const data = await res.json();
        setProperties(data.property);
        setTotalPages(data.countTotal);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, limit]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties?.length === 0 ? (
          <div className="text-center">No properties found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
      <Pagination pageNum={page} limit={limit} total={totalPages} onPageChange={handlePageChange}  />
    </section>
  );
};

export default Properties;
