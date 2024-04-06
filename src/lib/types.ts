// const d = {
//   "_id": "1",
//   "owner": "1",
//   "name": "Boston Commons Retreat",
//   "type": "Apartment",
//   "description": "This is a beautiful apartment located near the commons. It is a 2 bedroom apartment with a full kitchen and bathroom. It is available for weekly or monthly rentals.",
//   "location": {
//     "street": "120 Tremont Street",
//     "city": "Boston",
//     "state": "MA",
//     "zipcode": "02108"
//   },
//   "beds": 2,
//   "baths": 1,
//   "square_feet": 1500,
//   "amenities": [
//     "Wifi",
//     "Full kitchen",
//     "Washer & Dryer",
//     "Free Parking",
//     "Hot Tub",
//     "24/7 Security",
//     "Wheelchair Accessible",
//     "Elevator Access",
//     "Dishwasher",
//     "Gym/Fitness Center",
//     "Air Conditioning",
//     "Balcony/Patio",
//     "Smart TV",
//     "Coffee Maker"
//   ],
//   "rates": {
//     "weekly": 1100,
//     "monthly": 4200
//   },
//   "seller_info": {
//     "name": "John Doe",
//     "email": "john@gmail.com",
//     "phone": "617-555-5555"
//   },
//   "images": ["a1.jpg", "a2.jpg", "a3.jpg"],
//   "is_featured": false,
//   "createdAt": "2024-01-01T00:00:00.000Z",
//   "updatedAt": "2024-01-01T00:00:00.000Z"
// },

export type Property = {
  _id: string;
  owner: string;
  type: string;
  name: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    weekly?: number;
    monthly?: number
    nightly?: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
};
