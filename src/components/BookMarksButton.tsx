"use client";
import { Property } from "@/lib/types";
import React, { useEffect } from "react";
import { FaBookBookmark } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
const BookMarksButton = ({ property }: { property: Property | null }) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkBookmarks = async () => {
      try {
        if (!session) {
          setLoading(false);
          return;
        }
        const res = await fetch(`/api/bookmarks/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property?._id,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setIsBookmarked(data.isbookmarks);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkBookmarks();
  }, [property?._id, session]);

  const handleSubmit = async () => {
    try {
      if (!session) {
        toast.error("You need to login to bookmark this property");
        return;
      }

      const res = await fetch(`/api/bookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property?._id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message || "Property bookmarked successfully");
        setIsBookmarked(data.isbookmarks);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while bookmarking property");
    }
  };

  if (loading) return <p>loading...</p>;
  return (
    <>
      {isBookmarked ? (
        <button
        onClick={handleSubmit}
        className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      >
        <FaBookBookmark className=" mr-2" />
        remove from bookmarks
      </button>
      
      ) : (
        <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      >
        <FaBookBookmark className=" mr-2" />
        Add to bookmarks
      </button>
      )}
    </>
  );
};

export default BookMarksButton;
