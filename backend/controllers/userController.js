import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary';

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid email format' });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) return res.json({ success: false, message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: 'Incorrect password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).select('-password');

        res.json({ success: true, userData: user });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: 'Required fields are missing' });
        }

        const updateFields = {
            name,
            phone,
            dob,
            gender,
            address: address && typeof address === "string" ? JSON.parse(address) : address
        };

        if (imageFile) {
            const result = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: 'image'
            });
            updateFields.image = result.secure_url;
        }

        await userModel.findByIdAndUpdate(userId, updateFields);
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
};

// Book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select("-password");

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor Not Available' });
        }

        let bookedSlots = docData.slots_booked || {};

        if (bookedSlots[slotDate]?.includes(slotTime)) {
            return res.json({ success: false, message: 'Slot already booked' });
        }

        // Add slot to booked slots
        if (!bookedSlots[slotDate]) bookedSlots[slotDate] = [];
        bookedSlots[slotDate].push(slotTime);

        const user = await userModel.findById(userId).select('-password');

        const appointment = new appointmentModel({
            userId,
            docId,
            userData: user,
            docData: docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: new Date(),
        });

        await appointment.save();
        await doctorModel.findByIdAndUpdate(docId, { slots_booked: bookedSlots });

        res.json({ success: true, message: 'Appointment booked successfully' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
};

// Cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);

        if (!appointment || String(appointment.userId) !== String(userId)) {
            return res.json({ success: false, message: 'Unauthorized or invalid appointment' });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const doctor = await doctorModel.findById(appointment.docId);
        let slots = doctor.slots_booked || {};

        if (slots[appointment.slotDate]) {
            slots[appointment.slotDate] = slots[appointment.slotDate].filter(time => time !== appointment.slotTime);
        }

        await doctorModel.findByIdAndUpdate(appointment.docId, { slots_booked: slots });

        res.json({ success: true, message: 'Appointment cancelled successfully' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
};

// List appointments for a user
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
};


// API to make payment of appointment using razorpay
// const paymentRazorpay = async (req, res) => {
//     try {

//         const { appointmentId } = req.body
//         const appointmentData = await appointmentModel.findById(appointmentId)

//         if (!appointmentData || appointmentData.cancelled) {
//             return res.json({ success: false, message: 'Appointment Cancelled or not found' })
//         }

//         // creating options for razorpay payment
//         const options = {
//             amount: appointmentData.amount * 100,
//             currency: process.env.CURRENCY,
//             receipt: appointmentId,
//         }

//         // creation of an order
//         const order = await razorpayInstance.orders.create(options)

//         res.json({ success: true, order })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// // API to verify payment of razorpay
// const verifyRazorpay = async (req, res) => {
//     try {
//         const { razorpay_order_id } = req.body
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

//         if (orderInfo.status === 'paid') {
//             await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
//             res.json({ success: true, message: "Payment Successful" })
//         }
//         else {
//             res.json({ success: false, message: 'Payment Failed' })
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// // API to make payment of appointment using Stripe
// const paymentStripe = async (req, res) => {
//     try {

//         const { appointmentId } = req.body
//         const { origin } = req.headers

//         const appointmentData = await appointmentModel.findById(appointmentId)

//         if (!appointmentData || appointmentData.cancelled) {
//             return res.json({ success: false, message: 'Appointment Cancelled or not found' })
//         }

//         const currency = process.env.CURRENCY.toLocaleLowerCase()

//         const line_items = [{
//             price_data: {
//                 currency,
//                 product_data: {
//                     name: "Appointment Fees"
//                 },
//                 unit_amount: appointmentData.amount * 100
//             },
//             quantity: 1
//         }]

//         const session = await stripeInstance.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&appointmentId=${appointmentData._id}`,
//             cancel_url: `${origin}/verify?success=false&appointmentId=${appointmentData._id}`,
//             line_items: line_items,
//             mode: 'payment',
//         })

//         res.json({ success: true, session_url: session.url });

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// const verifyStripe = async (req, res) => {
//     try {

//         const { appointmentId, success } = req.body

//         if (success === "true") {
//             await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
//             return res.json({ success: true, message: 'Payment Successful' })
//         }

//         res.json({ success: false, message: 'Payment Failed' })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }

export {
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
}