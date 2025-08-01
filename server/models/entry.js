import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  emotion: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Entry = mongoose.model('Entry', entrySchema);
export default Entry;
