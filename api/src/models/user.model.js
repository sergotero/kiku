import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  rol: {
    type: String,
    enum: ["User", "Collaborator", "Administrator"],
    default: "User"
  },
  email: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/, "Introduce un email válido"],
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/, "La contraseña debe contener al menos una minúscula, una mayúscula, un número y un símbolo y debe tener entre 5 y 15 caracteres"]
  },
  lists: {
    type: [mongoose.Types.ObjectId],
    ref: "List"
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


userSchema.methods.checkPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

userSchema.pre("save", async function (next){
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.error(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;