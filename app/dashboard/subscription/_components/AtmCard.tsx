import { FC } from "react";

interface AtmCardProps {}

const AtmCard: FC<AtmCardProps> = ({}) => {
  return (
    <div className="bg-[#2E2E3A] rounded-3xl p-6 w-full">
      <div className="flex items-center justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="28"
          viewBox="0 0 45 28"
          fill="none"
        >
          <path
            d="M28.5475 24.8146H16.3918V2.96875H28.5475V24.8146Z"
            fill="#FF5F00"
          />
          <path
            d="M17.1715 13.8956C17.1715 9.46401 19.2464 5.51652 22.4775 2.9726C20.1147 1.11235 17.1326 0.00204086 13.8918 0.00204086C6.21938 0.00204086 3.05176e-05 6.22228 3.05176e-05 13.8956C3.05176e-05 21.5688 6.21938 27.7891 13.8918 27.7891C17.1326 27.7891 20.1147 26.6787 22.4775 24.8185C19.2464 22.2746 17.1715 18.3271 17.1715 13.8956Z"
            fill="#EB001B"
          />
          <path
            d="M44.9442 13.8956C44.9442 21.5688 38.7248 27.7891 31.0524 27.7891C27.8116 27.7891 24.8295 26.6787 22.4658 24.8185C25.6978 22.2746 27.7727 18.3271 27.7727 13.8956C27.7727 9.46401 25.6978 5.51652 22.4658 2.9726C24.8295 1.11235 27.8116 0.00204086 31.0524 0.00204086C38.7248 0.00204086 44.9442 6.22228 44.9442 13.8956Z"
            fill="#F79E1B"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white text-center my-4 tracking-wider">
        **** **** **** 8331
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <p className="text-xs uppercase text-white/70">Card Holder</p>
          <h1 className="text-[#EDEFF1] text-xl font-bold">Orion</h1>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs uppercase text-white/70">Expiry Date</p>
          <h1 className="text-[#EDEFF1] text-xl font-bold">09/24</h1>
        </div>
      </div>
    </div>
  );
};

export default AtmCard;
