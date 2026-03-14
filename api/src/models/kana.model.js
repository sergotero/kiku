import mongoose from "mongoose";

const writingSystemSchema = mongoose.Schema({
    char: { 
        type: String, 
        required: [true, 'El carácter es obligatorio'] 
    },
    strokes: { 
        type: Number, 
        min: 1 
    }
}, { _id: false });

const kanaSchema = mongoose.Schema({
    romaji: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    type: { 
        type: String, 
        enum: ['basic', 'diphthong'], 
        default: 'basic' 
    },
    category: { 
        type: String, 
        enum: ['seion', 'dakuon', 'handakuon'], 
        required: true 
    },
    hiragana: writingSystemSchema,
    katakana: writingSystemSchema,
    is_compound: { 
        type: Boolean, 
        default: false 
    }
}, { 
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
          delete ret._id;
        }
    }
});

const Kana = mongoose.model('Kana', kanaSchema);

export default Kana;