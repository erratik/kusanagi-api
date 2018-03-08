import mongoose from 'mongoose';

const singleDropSchema = new mongoose.Schema({
  type: String,
  timestamp: Number,
  content: {},
});

const dropSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  space: String,
  drops: [singleDropSchema],
});

export default mongoose.model('Drop', dropSchema);
