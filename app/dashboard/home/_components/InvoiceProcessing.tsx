import { FC } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

const InvoiceProcessing = ({}) => {
  const data: Payment[] = [
    {
      id: "923481029831",
      items: 43,
      amount: 100,
      date: "22/2/2022  3:45:01 PM",
    },
    {
      id: "923481029831",
      items: 43,
      amount: 100,
      date: "22/2/2022  3:45:01 PM",
    },
    {
      id: "923481029831",
      items: 43,
      amount: 100,
      date: "22/2/2022  3:45:01 PM",
    },
    {
      id: "923481029831",
      items: 43,
      amount: 100,
      date: "22/2/2022  3:45:01 PM",
    },
    {
      id: "923481029831",
      items: 43,
      amount: 100,
      date: "22/2/2022  3:45:01 PM",
    },
  ];
  return (
    <div className=" p-5 rounded-lg bg-white">
      <h2 className=" text-3xl font-bold pb-4">Invoice Processing</h2>
      <div className="">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default InvoiceProcessing;
