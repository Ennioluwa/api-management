import HomeNav from "../_components/HomeNav";
import AddApiKey from "./_components/AddApi";
import ApiHeader from "./_components/ApiHeader";
import ApiKeys from "./_components/ApiKeys";

const page = () => {
  return (
    <div className=" lg:container lg:ml-0">
      <HomeNav text="API Key Manager" />
      <ApiHeader />
      <ApiKeys />
      <AddApiKey />
    </div>
  );
};

export default page;
