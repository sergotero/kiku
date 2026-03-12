import mongoose from "mongoose";

const strokesSchema = mongoose.Schema({
  order: {type: Number, required: true},
  type: {type: String, required: true},
  path: {type: String, required: true}
},{ _id: false });

const strokeSchema = mongoose.Schema({
  kanji: {type: String, required: true},
  kanjiVGId: {type: String, required: true},
  codePoint: {type: String, required: true},
  strokeCount: {type: Number, required: true},
  strokes: [strokesSchema],
  components: [String]
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

const Stroke = mongoose.model("Stroke", strokeSchema);

export default Stroke;