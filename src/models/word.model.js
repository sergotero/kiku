import mongoose from "mongoose";

// --- Sub-schemas ---
const termSchema = mongoose.Schema({
  text: { type: String, required: true, unique: true, index: true },
  info: [String],
  priority: [String]
},
{ _id: false });

const readingSchema = mongoose.Schema({
  text: { type: String, required: true },
  noKanji: { type: Boolean, default: false },
  restrictedTo: [String],
  info: [String],
  priority: [String]
},
{ _id: false });

const partOfSpeechSchema = mongoose.Schema({
  code_XML: {type: String, required: true},
  label: {type: String, required: true, index: true}
},
{ _id: false });

const glossesSchema = mongoose.Schema({
  eng: {type: [String], required: true},
  spa: {type: [String], required: true}
},
{ _id: false });

const senseSchema = mongoose.Schema({
  restrictedToKanji: [String],
  restrictedToReading: [String],
  partOfSpeech: [partOfSpeechSchema],
  fields: {type: [String], required: true},
  misc: [String],
  dialect: [String],
  info: [String],
  crossReferences: [String],
  antonyms: [String],
  loanwordSource: [String],
  glosses: glossesSchema,
  examples: [String] 
},
{ _id: false });

// --- Schema Principal ---
const wordSchema = mongoose.Schema({
  id_XML: { type: Number, unique: true},
  word: [termSchema],
  readings: [readingSchema],
  senses: [senseSchema],
  kanjiCharacters: {type: [mongoose.Types.ObjectId], ref: "Kanji", index: true},
  searchForms: {type: [String], index: true},
  romaji: [String]
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
    } 
  }
});

const Word = mongoose.model("Word", wordSchema);

export default Word;