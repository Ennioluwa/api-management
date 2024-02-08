import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="h-[calc(100vh-4rem)] mt-20">
      <div className=" h-full py-10 px-4 overflow-auto">{children}</div>
    </div>
  );
};

export default Container;
