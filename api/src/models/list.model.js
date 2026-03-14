import mongoose from "mongoose";

const listSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  items: { type: [String] }
},{
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
    }
  }
});

const List = mongoose.model("List", listSchema);

export default List;