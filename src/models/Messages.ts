import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: {
      type: "String",
    },
    reciever: {
      type: "String",
    },
    read: {
      type: "Boolean",
      default: false,
    },
    property: {
      type: Schema.Types.ObjectId
    },
    name: {
      type: "String",
      required: [true, "Please provide a name"],
    },
    email: {
      type: "String",
      required: [true, "Please provide an email"],
    },
    phone: {
      type: "String",
    },
    body: {
      type: "String",
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", MessageSchema);
export default Message;
