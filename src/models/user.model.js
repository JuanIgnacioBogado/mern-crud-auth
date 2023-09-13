import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

export default model('User', UserSchema);
