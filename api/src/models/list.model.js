import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  item: {
    type: mongoose.Types.ObjectId,
    required: true,
    refPath: 'items.onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ["Word", "Kanji"]
  }
},{ _id: false });

const listSchema = mongoose.Schema({
  name: { type: String, required: true},
  items: { 
    type: [itemSchema]
  }
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