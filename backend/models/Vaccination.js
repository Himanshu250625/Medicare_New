import mongoose from 'mongoose';

const vaccinationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vaccineName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    administeredBy: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    batchNumber: {
      type: String,
      required: true,
    },
    nextDoseDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    certificateUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Vaccination', vaccinationSchema); 