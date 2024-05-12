import { models, model, Schema } from "mongoose";


const Property = new Schema(
  {
    owner: {
      type: String,
      required: [true, "Please provide an owner"],    
    },
    name: {
      type: String,
      required: [true, "Please provide a name for the property"],
    },
    type: {
      type: String,
      required: [true, "Please provide a property type"],
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      
      },
      city: {
        type: String,
        required: [true, "Please provide a city"],
      },
      state: {
        type: String,
       
      },
      zipcode: {
        type: String,
      
      },
    },
    beds: {
      type: Number,
      required: [true, "Please provide the number of beds"],
    },
    baths: {
      type: Number,
      required: [true, "Please provide the number of baths"],
    },
    square_feet: {
      type: Number,
      required: [true, "Please provide the square footage"],
    },
    amenities:[ {
      type: String,  
    }],
    rates: {
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
      nightly:{
        type: Number,
      }
    },
    seller_info: {
      name: {
        type: String,
        required: [true, "Please provide a name"],
      },
      email: {
        type: String,
        required: [true, "Please provide an email address"],
      },
      phone: {
        type: String,
        required: [true, "Please provide a phone number"],
      },
    },
    images: [{
      type: String
    }],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PropertyModel = models.Property || model("Property", Property);
export default PropertyModel;
