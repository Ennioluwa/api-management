"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

interface HeroPageProps {}

const heroProps = [
  {
    title: `We're here to Increase your`,
    title2: "Productivity",
    subtitle:
      "Remit to the government easily and keep tab on all your invoices all in one place",
    imgUrl: "/hero_1.png",
    additionalInfo: [
      { title: "5000+", subtitle: "Customers" },
      { title: "8000+", subtitle: "Deliveries" },
      { title: "1000+", subtitle: "Ratings" },
    ],
  },
  {
    title: `Create an Account in just`,
    title2: "3 Steps",
    subtitle:
      "Our growing number of customers speaks for how great our service is.",
    imgUrl: "/hero_2.png",
    additionalInfo: [
      { title: "Fill Info", subtitle: "STEP ONE" },
      { title: "Get Verified", subtitle: "STEP TWO" },
      { title: "Create First API", subtitle: "STEP THREE" },
    ],
  },
];

const HeroPage: FC<HeroPageProps> = ({}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const router = useRouter();

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!api) return;
      console.log("api", api);

      api.scrollTo(index);
      setActive(index);
    },
    [api]
  );

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      console.log("api selected", api.selectedScrollSnap());
      setActive(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="h-full container py-20 lg:min-h-[calc(100svh-4rem)] w-full flex justify-center items-center">
      <Carousel opts={{ loop: true }} className="w-full " setApi={setApi}>
        <CarouselContent>
          {heroProps.map((item, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col lg:flex-row items-center gap-5 justify-between w-full  ">
                <div className="flex items-center h-full w-full lg:w-1/2 ">
                  <div className=" w-full">
                    <h1 className="font-extrabold text-5xl md:text-7xl text-gray-800">
                      {item.title}{" "}
                      <span className="text-blue-500">{item.title2}</span>
                    </h1>
                    <p className="my-4 text-gray-500 text-xl">
                      {item.subtitle}
                    </p>
                    <div className="w-full lg:w-1/4 my-4">
                      <Button
                        onClick={() => router.push("/login")}
                        className="uppercase font-bold rounded-lg"
                      >
                        Get Started
                      </Button>
                    </div>
                    <div className="w-full gap-10 gap-y-2 flex flex-wrap md:items-center mt-20">
                      {item.additionalInfo.map((info, index) => (
                        <div className=" space-y-1" key={index}>
                          <p className="font-bold text-3xl text-bgPrimary">
                            {info.title}
                          </p>
                          <p className="text-lg text-gray-400">
                            {info.subtitle}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px] lg:max-w-full mx-auto h-min">
                  <Image
                    src={item.imgUrl}
                    alt="Hero"
                    fill
                    className=" object-cover h-min"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center w-full gap-2 pt-10">
          <div
            onClick={() => onDotButtonClick(0)}
            className={`${
              active === 0 ? "bg-blue-500" : "bg-gray-400"
            } w-4 h-4 rounded-full  cursor-pointer`}
          />
          <div
            onClick={() => onDotButtonClick(1)}
            className={`${
              active === 1 ? "bg-blue-500" : "bg-gray-400"
            } w-4 h-4 rounded-full  cursor-pointer`}
          />
        </div>
      </Carousel>
    </section>
  );
};

export default HeroPage;
