"use client"

import React from 'react';
import dynamic from 'next/dynamic';

const PricingAgreementModal = dynamic(
  () => import("../price-payment/_priceComponent/pricing-agreement-modal"),
  {
    ssr: false,
  }
);

const MainPricePayment = dynamic(() => import("./_priceComponent/Main-Price-payment"), {
  ssr: false,
});

export default function PricePayment() {
	return (
    <section className="w-full text-foundation-black-black-400 overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] [row-gap:5px] flex-wrap bg-foundation-grey-grey-50 rounded-2xl px-4 py-4">
      <div className="flex flex-col gap-2 mt-2">
        <h2 className=" font-[500] text-[20px] m-0">Price & Payments</h2>
        <p className="font-normal text-base text-foundation-grey-grey-700 m-0">
          Manage your Subscription Plan and User Access
        </p>
      </div>
      <PricingAgreementModal />
      {/* <PricePaymentForm /> */}
      <MainPricePayment />
    </section>
  );
}
