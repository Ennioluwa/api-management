import Navbar from "../_components/Navbar";
import BusinessIdentityForm from "./_components/BusinessIdentityForm";
import Authenticated from "./_components/Authenticated";
import { useAppSelector } from "@/lib/hooks";
import BusinessIdentityHeader from "./_components/BusinessIdentityHeader";

const page = ({}) => {
  return (
    <Authenticated>
      <div>
        <Navbar />
        <div className="container max-w-[440px] p-8 border rounded-lg space-y-8 ">
          <BusinessIdentityHeader />
          <BusinessIdentityForm />
        </div>
      </div>
    </Authenticated>
  );
};

export default page;
