import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import ChatBot from "./components/ChatBot";
import MedicineStore from "./pages/MedicineStore";
import MedicineDetail from "./pages/MedicineDetail";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import Offers from "./pages/Offers";
import Category from "./pages/Category";
import Account from "./pages/Account";
import PaymentOptions from "./pages/PaymentOptions";
import OrderConfirmation from "./pages/OrderConfirmation";
import CardPayment from "./pages/payment/CardPayment";
import UPIPayment from "./pages/payment/UPIPayment";
import NetBankingPayment from "./pages/payment/NetBankingPayment";
import CashOnDelivery from "./pages/payment/CashOnDelivery";
import PaymentGateway from "./pages/payment/PaymentGateway";
import StripePaymentForm from "./pages/payment/StripePaymentForm";
import RazorpayPaymentForm from "./pages/payment/RazorpayPaymentForm";
import PaymentSuccess from "./pages/payment/PaymentSuccess";

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="mx-4 sm:mx-[10%]">
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment/:docId" element={<Appointment />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/medicine-store" element={<MedicineStore />} />
            <Route path="/medicine-store/:id" element={<MedicineDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/category" element={<Category />} />
            <Route path="/account" element={<Account />} />
            <Route path="/payment-options" element={<PaymentOptions />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/payment/card" element={<CardPayment />} />
            <Route path="/payment/upi" element={<UPIPayment />} />
            <Route path="/payment/netbanking" element={<NetBankingPayment />} />
            <Route path="/payment/cod" element={<CashOnDelivery />} />
            <Route
              path="/payment/:appointmentId"
              element={<PaymentGateway />}
            />
            <Route path="/payment/stripe" element={<StripePaymentForm />} />
            <Route path="/payment/razorpay" element={<RazorpayPaymentForm />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
          </Routes>
        </div>
        <Footer />
        <ChatBot />
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
