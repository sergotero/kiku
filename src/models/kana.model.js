import mongoose from "mongoose";

const seionSchema = mongoose.Schema({
  katakana: {type: String, required: true},
  hiragana: {type: String, required: true},
  romaji: {type: String, required: true}
},{
  _id: false
});

const dakugonSchema = mongoose.Schema({
  katakana: {type: String},
  hiragana: {type: String},
  romaji: {type: String}
},{
  _id: false
});

const handakugonSchema = mongoose.Schema({
  katakana: {type: String},
  hiragana: {type: String},
  romaji: {type: String}
},{
  _id: false
});

const strokesSchema = mongoose.Schema({
  katakana: {type: Number, required: true},
  hiragana: {type: Number, required: true}
},{
  _id: false
});

const kanaSchema = mongoose.Schema({
  seion: seionSchema,
  dakugon: dakugonSchema,
  handakugon: handakugonSchema,
  strokes: strokesSchema
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

const Kana = mongoose.model("Kana", kanaSchema);

export default Kana;