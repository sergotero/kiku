import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User"}
},{
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true }
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;