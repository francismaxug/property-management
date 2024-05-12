"use client";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { fetchSingleProperty } from "@/utils/fetchResource";
import { Property } from "@/lib/types";
import Loading from "@/app/loading";
import PropertyDetails from "@/components/PropertyDetails";
import { useSession } from "next-auth/react";
import PropertyImages from "@/components/PropertyImages";
import BookMarksButton from "@/components/BookMarksButton";
import ShareButtons from "@/components/ShareButtons";
import ContactPage from "@/components/ContactPage";
const Controls = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [find, setFind] = useState<Property | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!id) return;
        setIsLoading(true);
        const property = await fetchSingleProperty(id);
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
  if (!find && !isLoading)
    return (
      <div className=" text-center text-2xl mt-10 font-bold">
        Property not found
      </div>
    );
  return (
    <>
      <section>
        <div className="container-xl m-auto">
          <div className="grid grid-cols-1">
            <Image
              src={find?.images[0]}
              alt=""
              className="object-cover h-[400px] w-full"
              width={500}
              height={500}
              quality={80}
              priority
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className=" mr-2" /> Back to Properties
          </Link>
        </div>
      </section>

      {/* <!-- Property Info --> */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails find={find} />
            {/* <!-- Sidebar --> */}
            <aside className="space-y-4 ">
              <BookMarksButton property={find} />
              <ShareButtons property={find} />

              {/* <!-- Contact Form --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">
                  Contact Property Manager
                </h3>
              <ContactPage property={find} />
              </div>
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages image={find?.images} />
    </>
  );
};

export default Controls;
