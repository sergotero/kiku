import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  
  // El ID del objeto (puede ser de Word o de Kanji)
  itemId: { 
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
  versionKey: false
});

const Report = mongoose.model("Report", reportSchema);

export default Report;