import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  // El ID del objeto (puede ser de Word o de Kanji)
  item: { 
    type: mongoose.Types.ObjectId, 
    required: true, 
    refPath: 'onModel' 
  },
  
  // Este campo guarda el nombre del modelo ("Word" o "Kanji")
  onModel: {
    type: String,
    required: true,
    enum: ['Word', 'Kanji'] // Solo permite estos dos valores
  },
  
  reportMessage: { type: String, required: true },
  isSolved: { type: Boolean, default: false }
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

const Report = mongoose.model("Report", reportSchema);

export default Report;