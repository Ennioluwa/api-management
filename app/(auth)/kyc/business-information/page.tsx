import Navbar from "../_components/Navbar";
import BusinessInformationForm from "./_components/BusinessInformationForm";
import Authenticated from "./Authenticated";

const page = ({}) => {
  return (
    <Authenticated>
      <div className=" overflow-hidden">
        <Navbar />
        <div className=" py-40">
          <div className="container max-w-xl p-8 border rounded-lg space-y-8 overflow-auto ">
            <div>
              <h3 className=" text-xl font-bold mb-2.5">
                Welcome Nusaiba, Tell us about your company
              </h3>
              <h4 className=" text-xs mb-2.5">
                Enter appropriate and official information about your business
                below
              </h4>
            </div>

            <BusinessInformationForm />
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default page;
