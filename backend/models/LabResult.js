import mongoose from 'mongoose';

const labResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    testName: {
      type: String,
      required: true,
    },
    testDate: {
      type: Date,
      required: true,
    },
    labName: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    results: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('LabResult', labResultSchema); 