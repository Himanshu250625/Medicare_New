import MedicalHistory from '../models/MedicalHistory.js';
import Prescription from '../models/Prescription.js';
import LabResult from '../models/LabResult.js';
import Vaccination from '../models/Vaccination.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import PDFDocument from 'pdfkit';

// Medical History Controllers
export const addMedicalHistory = async (req, res) => {
  try {
    const { condition, diagnosis, date, doctor, notes } = req.body;
    let fileUrl = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path);
      fileUrl = result.secure_url;
    }

    const medicalHistory = new MedicalHistory({
      userId: req.user._id,
      condition,
      diagnosis,
      date,
      doctor,
      notes,
      fileUrl,
    });
    await medicalHistory.save();
    res.status(201).json({ success: true, message: 'Medical history added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMedicalHistory = async (req, res) => {
  try {
    const records = await MedicalHistory.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMedicalHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await MedicalHistory.findOneAndDelete({ _id: id, userId: req.user._id });
    res.status(200).json({ success: true, message: 'Medical history deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Prescription Controllers
export const addPrescription = async (req, res) => {
  try {
    const { medication, dosage, frequency, startDate, endDate, prescribedBy, notes } = req.body;
    const prescription = new Prescription({
      userId: req.user._id,
      medication,
      dosage,
      frequency,
      startDate,
      endDate,
      prescribedBy,
      notes,
    });
    await prescription.save();
    res.status(201).json({ success: true, message: 'Prescription added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ userId: req.user._id }).sort({ startDate: -1 });
    res.status(200).json({ success: true, prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    await Prescription.findOneAndDelete({ _id: id, userId: req.user._id });
    res.status(200).json({ success: true, message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const downloadPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findOne({ _id: id, userId: req.user._id });
    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=prescription-${id}.pdf`);

    doc.pipe(res);
    doc.fontSize(20).text('Prescription', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Medication: ${prescription.medication}`);
    doc.text(`Dosage: ${prescription.dosage}`);
    doc.text(`Frequency: ${prescription.frequency}`);
    doc.text(`Start Date: ${prescription.startDate.toLocaleDateString()}`);
    doc.text(`End Date: ${prescription.endDate.toLocaleDateString()}`);
    doc.text(`Prescribed By: ${prescription.prescribedBy}`);
    if (prescription.notes) {
      doc.moveDown().text(`Notes: ${prescription.notes}`);
    }
    doc.end();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lab Results Controllers
export const addLabResult = async (req, res) => {
  try {
    const { testName, testDate, labName, doctor, results, notes } = req.body;
    let fileUrl = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path);
      fileUrl = result.secure_url;
    }

    const labResult = new LabResult({
      userId: req.user._id,
      testName,
      testDate,
      labName,
      doctor,
      results,
      notes,
      fileUrl,
    });
    await labResult.save();
    res.status(201).json({ success: true, message: 'Lab result added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLabResults = async (req, res) => {
  try {
    const results = await LabResult.find({ userId: req.user._id }).sort({ testDate: -1 });
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteLabResult = async (req, res) => {
  try {
    const { id } = req.params;
    await LabResult.findOneAndDelete({ _id: id, userId: req.user._id });
    res.status(200).json({ success: true, message: 'Lab result deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const downloadLabResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await LabResult.findOne({ _id: id, userId: req.user._id });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Lab result not found' });
    }

    if (!result.fileUrl) {
      return res.status(404).json({ success: false, message: 'No file attached to this result' });
    }

    res.redirect(result.fileUrl);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Vaccination Controllers
export const addVaccination = async (req, res) => {
  try {
    const { vaccineName, date, administeredBy, location, batchNumber, nextDoseDate, notes } = req.body;
    let certificateUrl = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path);
      certificateUrl = result.secure_url;
    }

    const vaccination = new Vaccination({
      userId: req.user._id,
      vaccineName,
      date,
      administeredBy,
      location,
      batchNumber,
      nextDoseDate,
      notes,
      certificateUrl,
    });
    await vaccination.save();
    res.status(201).json({ success: true, message: 'Vaccination record added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVaccinations = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json({ success: true, vaccinations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteVaccination = async (req, res) => {
  try {
    const { id } = req.params;
    await Vaccination.findOneAndDelete({ _id: id, userId: req.user._id });
    res.status(200).json({ success: true, message: 'Vaccination record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const downloadVaccinationCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const vaccination = await Vaccination.findOne({ _id: id, userId: req.user._id });
    if (!vaccination) {
      return res.status(404).json({ success: false, message: 'Vaccination record not found' });
    }

    if (!vaccination.certificateUrl) {
      return res.status(404).json({ success: false, message: 'No certificate attached to this record' });
    }

    res.redirect(vaccination.certificateUrl);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}; 