"use client";

import React from "react";
// import ManageAccountForm from './_components/manageAccountForm';
import MainManageAccount from "./_components/main-manage-account";

export default function ManageYourAccount() {
  return (
    <section className="w-full text-foundation-black-black-400 flex flex-col items-start justify-start leading-[normal] tracking-[normal] [row-gap:5px] container flex-wrap bg-foundation-grey-grey-50 rounded-2xl px-4 py-4">
      <div className="flex flex-col gap-2 mt-2 w-full flex-wrap">
        <h2 className=" font-semibold text-[20px] m-0">Manage Your Users</h2>
        <p className="font-normal text-base text-foundation-grey-grey-800 m-0">
          Invite, Edit & Delete Users
        </p>
        {/* <ManageAccountForm /> */}
        <MainManageAccount />
      </div>
    </section>
  );
}
