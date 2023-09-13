import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      }
    }
  }
);

export default model('Tasks', TaskSchema);
