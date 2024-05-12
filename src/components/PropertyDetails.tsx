import { Property } from "@/lib/types";
import React from "react";
import { FaBath, FaBed, FaCheck, FaRulerCombined } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PropertyDetails = ({ find }: { find: Property | null }) => {
  return (
    <>
      <main className="md:col-span-2">
        <div className=" p-6 bg-white rounded-lg mb-3 shadow-md text-center md:text-left">
          <div className="text-gray-500 mb-4">{find?.type}</div>
          <h1 className="text-3xl font-bold mb-4">{find?.name}</h1>
          <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
            <FaLocationDot className="mr-2 text-orange-700" />
            <p className="text-orange-700">
              {find?.location?.street} {find?.location?.city},{" "}
              {find?.location?.state} {find?.location?.zipcode}
            </p>
          </div>

          <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
            Rates & Options
          </h3>
          <div className="flex flex-col md:flex-row justify-around items-center ">
            <div className=" flex justify-center items-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
              <div className="text-gray-500 mr-2 font-bold ">
                {!find?.rates.nightly
                  ? "Nightly ❌"
                  : `Nightly $${find?.rates.nightly}`}
              </div>
            </div>
            <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
              <div className="text-gray-500 mr-2 font-bold">Weekly</div>
              <div className="text-xl font-bold text-blue-500">
                {!find?.rates.weekly ? "❌" : `$ ${find?.rates.weekly}`}
              </div>
            </div>
            <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
              <div className="text-gray-500 mr-2 font-bold">Monthly</div>
              <div className="text-xl font-bold text-blue-500">
                {!find?.rates.monthly ? "❌" : `$ ${find?.rates.weekly}`}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-bold mb-6">Description & Details</h3>
          <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
            <p>
              <FaBed className=" inline-block mr-1.5" /> {find?.beds}
              <span className="hidden sm:inline">Beds</span>
            </p>
            <p>
              <FaBath className=" inline-block mr-1.5" />
              {find?.baths}
              <span className="hidden sm:inline">Baths</span>
            </p>
            <p>
              <FaRulerCombined className=" inline-block mr-1.5" />
              {find?.square_feet}
              <span className="hidden sm:inline">sqft</span>
            </p>
          </div>

          <p className="text-gray-500 mb-4 text-center">{find?.description}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-bold mb-6">Amenities</h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-3 list-none">
            {find?.amenities.map((amenity, index) => (
              <li key={index}>
                <FaCheck className="text-green-600 mr-2 inline-block" />{" "}
                {amenity}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <div id="map"></div>
        </div>
      </main>
    </>
  );
};

export default PropertyDetails;
