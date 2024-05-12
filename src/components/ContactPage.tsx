"use client";
import { Property } from "@/lib/types";
import { useSession } from "next-auth/react";
import { FaPaperPlane } from "react-icons/fa6";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactPage = ({ property }: { property: Property | null }) => {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [wasSubmited, setWasSubmited] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataObj = {
      name,
      email,
      phone,
      message,
      property: property?._id,
      recepient: property?.owner,
    };

    try {
      const res = await fetch("/api/massages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });

      if (res.status === 200) {
        toast.success("message sent");
        setWasSubmited(true);
      }

      if (res.status === 400 || res.status === 401) {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
    }
  };
  return (
    <>
      {session && wasSubmited ? (
        <p className=" text-green-500">
          Your Message was submitted successfully
        </p>
      ) : session && !wasSubmited ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className=" mr-2" /> Send Message
            </button>
          </div>
        </form>
      ) : (
        <p>You need to log in before accessing this resource</p>
      )}
    </>
  );
};

export default ContactPage;
