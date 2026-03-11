import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User"},
  reportMessage: { type: String, required: true },
  isSolved: { type: Boolean }
},{
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true }
});

const Report = mongoose.model("Report", reportSchema);

export default Report;