import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import FaqList from "../components/FaqList";
import faqImg from "../assets/faq-img.png";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
      <section className="py-[50px] bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-4xl lg:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent backdrop-blur-sm p-4 rounded-lg bg-white/10 shadow-sm transform hover:scale-[1.02] transition-transform duration-300">
              Most questions by our beloved patients
            </h2>
            <p className="text-base md:text-lg text-gray-600 text-center max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our services, appointments, and healthcare information.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4 items-center">
            {/* Left Image Section */}
            <div className="hidden md:block w-[70%] lg:w-[450px] h-[400px] lg:h-[600px] mx-auto lg:mx-0 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img
                src={faqImg}
                alt="FAQ"
                className="w-full h-full object-cover object-center animate-fadeIn hover:scale-105 transition-all duration-500"
                loading="lazy"
                sizes="(max-width: 768px) 70vw, 450px"
                width="450"
                height="600"
              />
            </div>

            {/* Right FAQ Section */}
            <div className="w-full lg:w-1/2 h-full animate-slideInRight">
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-10">
          <div className="xl:w-[470px] mx-auto p-4 rounded-lg backdrop-blur-sm bg-white/10 shadow-lg">
            <h2 className="text-4xl text-center font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              What our patient say
            </h2>
            <p className="text-[17px] leading-6 text-center text-gray-700">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial/>
        </div>
      </section>
    </div>
  )
}

export default Home