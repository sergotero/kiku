import mongoose from "mongoose";

// Sub-schemas (Se recomienda añadir { _id: false } para ahorrar espacio en la DB si no vamos a buscar sub-elementos específicos por su propio ID)
const additionalSchema = mongoose.Schema({
  type: String,
  value: String,
}, { _id: false });

const unicodeSchema = mongoose.Schema({
  codePoint: { type: String, required: true },
  hex: String,
  additional: [additionalSchema]
}, { _id: false });

const classificationSchema = mongoose.Schema({
  gradeLevel: Number,
  jlptLevel: { type: Number, index: true },
  frequencyRank: Number
}, { _id: false });

const variantsSchema = mongoose.Schema({
  system: String,
  value: String
}, { _id: false });

const dictionaryCodesSchema = mongoose.Schema({
  dictionary: String,
  entry: String,
  volume: { type: String, default: null },
  page: { type: String, default: null }
}, { _id: false });

const queryCodesSchema = mongoose.Schema({
  type: String,
  value: String,
  misclassification: String
}, { _id: false });

const referencesSchema = mongoose.Schema({
  dictionaryCodes: [dictionaryCodesSchema],
  queryCodes: [queryCodesSchema],
}, { _id: false });

const onKunyomiSchema = mongoose.Schema({
  reading: { type: String, required: true },
  clean: { type: String, required: true },
  romaji: { type: String, required: true },
  common: Boolean
}, { _id: false });

const readingsSchema = mongoose.Schema({
  onyomi: [onKunyomiSchema],
  kunyomi: [onKunyomiSchema],
  nanori: [String],
  chinese: [String],
  korean: [String],
  vietnamese: [String]
}, { _id: false });

const meaningsSchema = mongoose.Schema({
  en: { type: [String], required: true },
  fr: [String],
  es: { type: [String], required: true },
  pt: [String]
}, { _id: false });

const radReferencesSchema = mongoose.Schema({
  system: String,
  number: Number
}, { _id: false });

const radicalsSchema = mongoose.Schema({
  names: [String],
  references: [radReferencesSchema],
  components: [String]
}, { _id: false });

// --- Schema Principal ---
const kanjiSchema = mongoose.Schema({
  kanji: {
    type: String,
    required: [true, "This field is required"],
    unique: true,
    index: true,
  },
  unicode: unicodeSchema,
  classification: classificationSchema,
  strokes: {
    type: Schema.Types.ObjectId,
    ref: "Stroke"
  },
  variants: [variantsSchema],
  references: referencesSchema,
  readings: readingsSchema,
  meanings: meaningsSchema,
  search: {
    type: [String],
    required: true,
    index: true
  },
  radicals: radicalsSchema
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true }
});

const Kanji = mongoose.model("Kanji", kanjiSchema);

export default Kanji;