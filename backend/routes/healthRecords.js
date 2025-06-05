import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  // Medical History
  addMedicalHistory,
  getMedicalHistory,
  deleteMedicalHistory,
  // Prescriptions
  addPrescription,
  getPrescriptions,
  deletePrescription,
  downloadPrescription,
  // Lab Results
  addLabResult,
  getLabResults,
  deleteLabResult,
  downloadLabResult,
  // Vaccinations
  addVaccination,
  getVaccinations,
  deleteVaccination,
  downloadVaccinationCertificate,
} from '../controllers/healthRecordsController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Medical History Routes
router.post('/medical-history', protect, upload.single('file'), addMedicalHistory);
router.get('/medical-history', protect, getMedicalHistory);
router.delete('/medical-history/:id', protect, deleteMedicalHistory);

// Prescription Routes
router.post('/prescriptions', protect, addPrescription);
router.get('/prescriptions', protect, getPrescriptions);
router.delete('/prescriptions/:id', protect, deletePrescription);
router.get('/prescriptions/:id/download', protect, downloadPrescription);

// Lab Results Routes
router.post('/lab-results', protect, upload.single('file'), addLabResult);
router.get('/lab-results', protect, getLabResults);
router.delete('/lab-results/:id', protect, deleteLabResult);
router.get('/lab-results/:id/download', protect, downloadLabResult);

// Vaccination Routes
router.post('/vaccinations', protect, upload.single('certificate'), addVaccination);
router.get('/vaccinations', protect, getVaccinations);
router.delete('/vaccinations/:id', protect, deleteVaccination);
router.get('/vaccinations/:id/certificate', protect, downloadVaccinationCertificate);

export default router; 