import { fetchInvoiceStats } from "@/lib/hooks/api/invoices.api";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { PuffLoader } from "react-spinners";

interface ProcessedInvoicesProps {
  empty?: boolean;
}

const ProcessedInvoices: FC<ProcessedInvoicesProps> = ({ empty }) => {
  const {
    isPending,
    isError,
    data: invoiceStats,
    error,
    refetch,
  } = useQuery({
    queryKey: ["invoice stats"],
    queryFn: fetchInvoiceStats,
  });

  if ((isPending && !empty) || (!invoiceStats && !empty))
    return (
      <div className=" grid place-items-center w-full bg-white rounded-lg py-6 flex-1">
        <PuffLoader color="#0062FF" />
      </div>
    );

  return (
    <div
      className={`${
        empty
          ? " bg-white text-black"
          : " bg-transparent border border-dashed border-white text-white"
      } flex  justify-between items-center gap-5 rounded-lg w-full flex-1 p-5`}
    >
      <div className=" space-y-1">
        <p className=" text-xs font-bold">INVOICES PROCESSED</p>
        <p className=" text-3xl font-bold">
          {!empty ? invoiceStats?.currentMonthProcessed : 0}
        </p>
        <p className=" font-bold text-xs">
          Compared to {!empty ? invoiceStats?.lastMonthProcessed : 0} last month
        </p>
      </div>
      {empty ? (
        <svg
          width="105"
          height="70"
          viewBox="0 0 105 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="105" height="70" rx="10" fill="#F0F4F9" />
          <rect
            x="12"
            y="57"
            width="81"
            height="1"
            stroke="url(#paint0_linear_878_42037)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_878_42037"
              x1="35.1773"
              y1="56.9211"
              x2="35.1773"
              y2="58.1807"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0062FF" />
              <stop offset="1" stopColor="#4D91A5" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="89"
          height="72"
          viewBox="0 0 89 72"
          fill="none"
        >
          <g opacity="0.33">
            <path
              d="M6.79574 20.6654C5.37512 27.4104 3.00666 29.3764 2 29.5163V71.7788H87.3333V7.40945C86.1242 8.6471 83.2713 14.217 81.5322 26.5951C79.3584 42.0677 76.0823 32.2468 74.7658 29.2819C73.4493 26.3171 71.1224 25.3906 69.6834 25.8539C68.2443 26.3171 65.9787 27.3363 64.9071 21.5919C63.8355 15.8476 62.7537 12.1121 59.8246 13.5313C57.2222 13.8093 56.0893 13.7166 54.8647 10.9371C53.64 8.1576 49.9965 1.67206 47.3941 9.64001C44.7916 17.608 42.0973 21.2213 39.2805 10.4739C36.4637 -0.273607 33.4633 1.0235 32.2998 4.54423C31.1364 8.06495 30.3702 18.7969 27.5666 21.9512C25.1839 23.3844 23.792 25.7408 21.2776 33.6365C18.0322 43.8281 16.0727 34.841 14.5725 23.9082C13.0722 12.9754 8.57151 12.2342 6.79574 20.6654Z"
              fill="url(#paint0_linear_2735_35982)"
            />
          </g>
          <path
            d="M2.125 29.4447C3.12842 29.3048 5.48926 27.3387 6.90531 20.5938C8.67536 12.1626 13.1616 12.9038 14.657 23.8366C16.1524 34.7693 18.1056 43.7564 21.3406 33.5649C24.5756 23.3733 24.8704 24.6694 27.658 22.0762C30.4725 19.4579 30.5371 10.6495 32.5402 4.56841C33.6999 1.04768 36.4778 -0.345271 39.2856 10.4022C42.0933 21.1497 44.7789 17.5363 47.373 9.56835C49.9671 1.6004 53.5988 8.08594 54.8196 10.8655C56.0403 13.645 57.5 14.5077 59.7636 13.4597C62.5838 12.154 63.7615 15.7759 64.8297 21.5203C65.8978 27.2646 68.1562 26.2455 69.5906 25.7822C71.025 25.319 73.3444 26.2455 74.6567 29.2103C75.969 32.1751 79.2345 41.9961 81.4013 26.5234C83.1348 14.1453 85.9786 8.57544 87.1838 7.33778"
            stroke="#F0F4F9"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="61.125"
            y1="13.6953"
            x2="61.125"
            y2="71.0002"
            stroke="#F0F4F9"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g filter="url(#filter0_d_2735_35982)">
            <ellipse
              cx="60.0213"
              cy="12.9087"
              rx="2.4381"
              ry="4.54545"
              fill="#F0F4F9"
            />
            <path
              d="M61.4594 12.9087C61.4594 14.0322 61.213 14.9996 60.8641 15.6502C60.4928 16.3424 60.1485 16.4542 60.0213 16.4542C59.8942 16.4542 59.5499 16.3424 59.1786 15.6502C58.8296 14.9996 58.5833 14.0322 58.5833 12.9087C58.5833 11.7853 58.8296 10.8178 59.1786 10.1673C59.5499 9.47511 59.8942 9.36328 60.0213 9.36328C60.1485 9.36328 60.4928 9.47511 60.8641 10.1673C61.213 10.8178 61.4594 11.7853 61.4594 12.9087Z"
              stroke="white"
              strokeWidth="2"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_2735_35982"
              x="54.5833"
              y="5.36328"
              width="10.8762"
              height="15.0908"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="3"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_2735_35982"
              />
              <feOffset />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0509804 0 0 0 0 0.0392157 0 0 0 0 0.172549 0 0 0 0.5 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2735_35982"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2735_35982"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_2735_35982"
              x1="44.6667"
              y1="2.01172"
              x2="44.6667"
              y2="74.1328"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="0.46679" stopColor="#D9D9D9" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default ProcessedInvoices;
