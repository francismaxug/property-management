import { Property } from "@/lib/types";
import { cache } from "react";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;
type Propertyy = {
  countTotal: number;
  property: Property[]
}
async function fetchProperties():Promise<Propertyy> {
  try {
    if (!API_DOMAIN) {
      return {countTotal: 0, property: []};
    }
    const res = await fetch(`${API_DOMAIN}/properties`,{
      cache: "no-store",
    });
    if (!res.ok) throw new Error("An error occurred while fetching the data");
    const data: Propertyy = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return {countTotal: 0, property: []};
  }
}

async function fetchSingleProperty(id: string | string[]) {
  try {
    if (!API_DOMAIN) {
      return null;
    }
    const res = await fetch(`${API_DOMAIN}/properties/${id}`);
    if (!res.ok) throw new Error("An error occurred while fetching the data");
    const data: Property = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchSingleProperty };
