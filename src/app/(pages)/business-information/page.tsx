"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { authImage } from "../../../../public";

const AgreementModal = dynamic(
  () => import("../setup/_setupComponets/agreementModal"),
  { ssr: false }
);
const MainForm = dynamic(() => import("./_component/mainForm"), { ssr: false });

const BusinessInformation = () => {
  return (
    <main className="w-full flex flex-col justify-start items-center bg-gray-50">
      <div className="mb-4">
        <h2 className="font-semibold text-2xl">Company Information</h2>
        <p className="text-gray-600 text-sm">
          Kindly fill out your company information
        </p>
      </div>
      <section className="w-full flex flex-col md:flex-row justify-between items-start bg-gray-50 rounded-2xl max-w-[900px] 2xl:max-w-[1000px] mx-auto shadow-lg">
        {/* Left Section - Form */}
        <div className="w-full md:w-3/5 text-foundation-black-black-400 flex flex-col items-start justify-start leading-normal tracking-normal">
          <div className="w-full bg-white p-2.5">
            <AgreementModal />
            <MainForm />
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:flex w-3/7 h-full bg-purple-500 rounded-tr-xl rounded-br-xl items-center justify-center p-4 mt-[3rem]">
          <Image
            src={authImage}
            alt="Business Illustration"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
      </section>
    </main>
  );
};

export default BusinessInformation;
