
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
      <section className="py-[50px]">
        <div className="container">
          <div className="flex justify-between gap-8 lg:gap-4 items-center">
            {/* Left Image Section */}
            <div className="w-[450px] h-full hidden md:block overflow-hidden ml-10">
              <img
                src={faqImg}
                alt="FAQ"
                className="w-full h-full object-cover animate-fadeIn"
              />
            </div>

            {/* Right FAQ Section */}
            <div className="w-full md:w-1/2 h-full animate-slideInRight mr-8">
              <h2 className="text-4xl font-semibold mb-6">
                Most questions by our beloved patients
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="text-4xl text-center font-semibold">What our patient say</h2>
            <p className="text-[17px] leading-6 text-center mt-5">
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