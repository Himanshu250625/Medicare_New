import mongoose from 'mongoose';

const medicalHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    doctor: {
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

export default mongoose.model('MedicalHistory', medicalHistorySchema); 