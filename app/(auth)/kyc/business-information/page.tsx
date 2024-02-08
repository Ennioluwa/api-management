import Navbar from "../_components/Navbar";
import Authenticated from "./_components/Authenticated";
import BusinessInformationForm from "./_components/BusinessInformationForm";
import BusinessInformationHeader from "./_components/BusinessInformationHeader";

const page = ({}) => {
  return (
    <Authenticated>
      <div className=" overflow-hidden">
        <Navbar />
        <div className="container max-w-[440px] p-8 border rounded-lg flex flex-col gap-8 overflow-auto ">
          <BusinessInformationHeader />
          <BusinessInformationForm />
        </div>
      </div>
    </Authenticated>
  );
};

export default page;
