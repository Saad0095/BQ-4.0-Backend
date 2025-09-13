
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

messageSchema.index({ createdAt: -1 });

messageSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Message = mongoose.model('Message', messageSchema);
