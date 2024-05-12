import { model, models, Schema } from "mongoose";

const UserBookMarks = new Schema({
  user: {
    type: String,
    default: "francis atinga",
  },
  bookmarks: {
    type: Array,
    default: [],
  },
});

const BookMarksModel= models.UserBookMarks || model("UserBookMarks", UserBookMarks);
export default BookMarksModel;
