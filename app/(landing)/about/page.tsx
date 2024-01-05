import { FC } from "react";
import HomeNav from "../_components/HomeNav";
import Footer from "../_components/Footer";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className=" bg-[#f1f1f1] text-dark text-center  min-h-[calc(100vh_-_80px)]">
      <div className="flex flex-col justify-between min-h-[calc(100vh_-_80px)]">
        <div className="lg:container p-5 lg:p-10 mb-auto">
          <HomeNav text="About us" />
          <h3 className=" text-4xl font-bold mb-2.5">About us</h3>
          <h4 className=" text-xl mb-2.5 pb-6">
            Best business transaction monitoring technology
          </h4>
          <div className=" p-10 bg-white space-y-5 max-w-2xl mx-auto text-left">
            <h6 className=" text-3xl font-bold">We Help Businesses Grow!</h6>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book
            </p>
            <p>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <p>
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum
            </p>
          </div>
        </div>
        <div className=" mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default page;
