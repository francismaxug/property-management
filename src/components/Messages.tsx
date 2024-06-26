"use client";
import React from "react";
import { useState, useEffect } from "react";

const MessageCard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessafe = async () => {
      try {
        const res = await fetch("/api/messages");
        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
          console.log(data)
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessafe();
  }, []);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
              <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry:</span>
                Boston Commons Retreat
              </h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Obcaecati libero nobis vero quos aspernatur nemo alias nam, odit
                dolores sed quaerat illum impedit quibusdam officia ad
                voluptatibus molestias sequi? Repudiandae!
              </p>

              <ul className="mt-4">
                <li>
                  <strong>Name:</strong> John Doe
                </li>

                <li>
                  <strong>Reply Email:</strong>
                  <a
                    href="mailto:recipient@example.com"
                    className="text-blue-500"
                  >
                    recipient@example.com
                  </a>
                </li>
                <li>
                  <strong>Reply Phone:</strong>
                  <a href="tel:123-456-7890" className="text-blue-500">
                    123-456-7890
                  </a>
                </li>
                <li>
                  <strong>Received:</strong>1/1/2024 12:00 PM
                </li>
              </ul>
              <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
                Mark As Read
              </button>
              <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageCard;
