// // import Address from "@/components/donation/Address";
// import DivClickDisplay from "@/components/donation/page";
// import PaymentMethod from "@/components/donation/PaymentMethod";

import { PaymentMethod } from "../composants/Don/PaymentMethod";

export const Don = () => {
  return (
    <>
      <div className="min-h-screen grid items-center justify-center my-7 py-10 bg-[url('/images/aeey.jpeg')] bg-no-repeat bg-cover bg-center bg-fixed">
        <div className=" min-h-screen grid items-center justify-center ">
          <div className="flex justify-center items-center ">
            <h1 className="text-2xl font-bold  h-auto bg-white/50 md:p-3 md:w-auto px-1 w-auto mx-10 rounded grid items-center mt-7  text-gray-800 dark:text-white  text-center">
               Aidez notre association à faire plus
            </h1>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 md:px-5 items-start">
            <div className="w-full md:max-w-lg"><DivClickDisplay/></div>
            {/* <div className=" md:max-w-lg ">
              <Address />
            </div> */}
            <div className=" md:max-w-lg "> <PaymentMethod/></div>
          </div>
        </div>
      </div>
    </>
  );
};

