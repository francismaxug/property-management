"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Loading from "../loading";
import Link from "next/link";
import { Property } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";
const Profile = () => {
  const { data: session, status } = useSession();
  const [owner, setOwner] = useState<Property[]>([]);
  useEffect(() => {
    async function getP() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/profile`
        );
        const data: Property[] = await res.json();
        console.log(data.length);
        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    }
    getP();
  }, []);

  const handleOnDelete = async (id: string) => {
    console.log(id);
    try {
      confirm("Are you sure you want to delete this property?");
      if (!confirm) return;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) toast.error("Failed to delete property");
      const data = await res.json();
      console.log(data);
      toast.success(data.message);

    
      setOwner(owner.filter((item) => item._id !== id))
    } catch (error) {
      console.log(error);
    }
    // fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`, {
    //   method: "DELETE",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setOwner(owner.filter((item) => item._id !== id));
    //   })
    //   .catch((error) => console.log(error));
  };

  if (status === "loading") return <Loading />;

  return (
    <>
      {status === "authenticated" ? (
        <section className="bg-blue-50">
          <div className="container m-auto py-24">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
              <h1 className="text-3xl font-bold mb-4">Your Profile </h1>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mx-20 mt-10">
                  <div className="mb-4">
                    <Image
                      className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                      src={session.user!.image!}
                      alt="User"
                      width={500}
                      height={500}
                      quality={80}
                    />
                  </div>
                  <h2 className="text-xl mb-4">
                    <span className="font-bold  block">Name: </span>{" "}
                    {session.user!.name}
                  </h2>
                  <h2 className="text-xl">
                    <span className="font-bold  block">Email: </span>{" "}
                    {session.user!.email!}
                  </h2>
                </div>

                <div className="md:w-3/4 md:pl-4">
                  <h2 className="text-xl font-semibold mb-4 underline">
                    Your Listings
                  </h2>
                  {owner?.length === 0 ? (
                    <div>
                      <p>You have no listings</p>
                      <Link
                        className=" text-blue-400 underline pt-4"
                        href="/properties/add"
                      >
                        Add properties
                      </Link>{" "}
                    </div>
                  ) : (
                    owner?.map((arr, index) => (
                      <div key={index} className="mb-10">
                        <Link href={`/properties/${arr._id}`}>
                          <Image
                            className="h-32 w-full rounded-md object-cover"
                            src={arr?.images[0]}
                            alt="Property 1"
                            width={500}
                            height={500}
                            quality={80}
                          />
                        </Link>
                        <div className="mt-2">
                          <p className="text-lg font-semibold">{arr.name}</p>
                          <p className="text-gray-600">
                            Address: 123 {arr.location.street}
                          </p>
                        </div>
                        <div className="mt-2">
                          <Link
                            href={`properties/${arr._id}/edit`}
                            className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleOnDelete(arr._id)}
                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className=" mx-auto max-w-[20rem] mt-32">
          <div className="text-center ">
            <p>Please sign in to continue</p>
            <button
              onClick={() => signIn()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
