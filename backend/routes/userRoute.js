import express from 'express';
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  // paymentRazorpay,
  // verifyRazorpay,
  // paymentStripe,
  // verifyStripe
} from '../controllers/userController.js';

import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

// User Authentication
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Profile Routes
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", authUser, upload.single('image'), updateProfile);

// Appointment Routes
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

// Payment Integration (to be implemented)
// userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
// userRouter.post("/verify-razorpay", authUser, verifyRazorpay);
// userRouter.post("/payment-stripe", authUser, paymentStripe);
// userRouter.post("/verify-stripe", authUser, verifyStripe);

export default userRouter;
