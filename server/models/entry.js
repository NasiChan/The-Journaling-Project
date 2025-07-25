import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Entry = mongoose.model('Entry', entrySchema);
export default Entry;
