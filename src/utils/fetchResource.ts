import { Property } from "@/lib/types";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;
async function fetchProperties() {
  try {
    if (!API_DOMAIN) {
      return [];
    }
    const res = await fetch(`${API_DOMAIN}/properties`);
    if (!res.ok) throw new Error("An error occurred while fetching the data");
    const data: Property[] = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchSingleProperty(id: string | string[]) {
  try {
    if (!API_DOMAIN) {
      return null;
    }
    const res = await fetch(
      `${API_DOMAIN}/properties/${id}`
    );
    if (!res.ok) throw new Error("An error occurred while fetching the data");
    const data: Property = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchSingleProperty };
