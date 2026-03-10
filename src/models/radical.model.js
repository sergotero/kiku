import mongoose from "mongoose";

const radicalSchema = mongoose.Schema({
  radical: {type: String, required: true},
  kanji: {type: [mongoose.Types.ObjectId], ref: "Kanji"},
  kanjiCount: Number
},{
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true }
});

const Radical = mongoose.model("Radical", radicalSchema);

export default Radical;