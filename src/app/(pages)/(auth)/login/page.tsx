"use client";
import NavButton from "@/components/_landingpgComponents/navButton";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useLogin } from "@/hooks/mutate";
import { loginFormSchema } from "@/lib/api/definition";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  authImage,
  facebookicon,
  googleicon,
  logoxyz,
  vector102,
} from "../../../../../public";
import useGeolocation from "./GenerateLocation";
import { toast } from "react-toastify";

type LoginData = z.infer<typeof loginFormSchema>;

export default function LogIn() {
  const { latitude, longitude, address, error } = useGeolocation();

  // API CALL
  const { mutate: loginMutate, isPending } = useLogin();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    if (error) {
      console.log("Geolocation error:", error);
    }

    event?.preventDefault();
    loginMutate(
      {
        ...data,
        longitude: longitude?.toString() || "",
        latitude: latitude?.toString() || "",
        address: address || "",
      },
      {
        onError(error, variables, context) {
          if (error.message === "Network Error") {
            toast.error("Network error: check your internet connection.");
          } else {
            toast.error(`Error: ${error.message}`);
          }
        },
      }
    );
  };

  return (
    <section className=" bg-foundation-white-white-400 flex justify-center items-center text-gray-500 lg:p-28 h-screen">
      {isPending && <LoadingOverlay />}
      <div className="py-6 px-6 sm:px-16 w-full">
        <div className="w-full flex flex-col md:flex-row justify-center items-start lg:gap-x-4 rounded-xl shadow-lg">
          <div className="flex h-auto w-full flex-col justify-between items-start text-start px-4 py-2 md:py-0">
            <div className="mb-2">
              <Link href={"/"}>
                <Image
                  src={logoxyz}
                  alt=""
                  className="w-[74px] h-7 object-contain"
                />
              </Link>
            </div>
            <div className="flex flex-col w-full justify-center items-center text-base font-inter sm:mt-6 lg:mt-4">
              <div className="max-w-[450px] md:w-full flex flex-col justify-start text-start items-center">
                <h2 className="w-full font-normal text-start text-gray-700 mb-5 font-DmSans">
                  Login to your account
                </h2>

                <form
                  className="w-full"
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label htmlFor="email_address" className="block mb-2.5">
                      <span className=" text-foundation-grey-grey-900 text-[0.9rem]">
                        Email Address
                      </span>
                      <input
                        type="email"
                        id="email_address"
                        placeholder="Enter your email address"
                        className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0]"
                        {...register("email_address", {
                          required: true,
                        })}
                      />
                      {/* error handler */}
                      {errors.email_address && (
                        <span className="error-message px-2">
                          {errors.email_address.message}
                        </span>
                      )}
                    </label>

                    <label className=" block mb-2.5">
                      <span className=" text-foundation-grey-grey-900 text-[0.9rem]">
                        Password
                      </span>
                      <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] active:border-foundation-purple-purple-400 focus:border-foundation-purple-purple-400 focus:border-2 "
                        {...register("password", {
                          required: true,
                        })}
                      />
                      {/* error handler */}
                      {errors.password && (
                        <span className="error-message px-2">
                          {errors.password.message}
                        </span>
                      )}
                    </label>
                    <p className="text-sm text-gray-700 text-start my-1.5">
                      Forgotten password
                      <Link
                        href="/resetpassword"
                        className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                      >
                        {" "}
                        Click to Reset
                      </Link>
                    </p>
                  </div>
                  <NavButton styles="w-full mb-2.5 mt-1.5 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100 rounded-md py-1.5">
                    {isPending ? "Logging in..." : "Login"}
                  </NavButton>
                  <div className="flex justify-between items-center px-[0.85rem]">
                    <p className="text-[0.9rem] text-gray-700 text-center">
                      {`don't`} have an account{" "}
                      <a
                        href="/signup"
                        className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                      >
                        Sign Up
                      </a>
                    </p>

                    {/* testing path to access */}
                    <p className="text-[0.9rem] text-gray-700 text-center my-0">
                      direct access
                      <Link
                        href="/business-information"
                        className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                      >
                        {" "}
                        Setup page
                      </Link>
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-[280px] relative h-9 text-[#d0d0d0] text-base mb-2 flex justify-center items-center text-center">
                      <Image
                        className="absolute top-[20px] left-[0px] max-h-full w-[280px] ss:w-[260px]"
                        alt=""
                        src={vector102}
                      />
                      <div className="absolute top-[0px] left-[100px] bg-white w-[120px] ss:left-[70px] flex flex-row items-center justify-center p-2.5 box-border">
                        <div className="relative tracking-[0.01em] leading-[140%]">
                          Or
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mb-5 gap-2.5 text-gray-700 text-[18px]">
                    <button className="bg-white hover:bg-foundation-purple-purple-400 rounded-2xl border-2 outline-none border-foundation-grey-grey-300 border-solid cursor-pointer flex items-center justify-center font-semibold py-2.5 px-6 gap-[10px] text-center align-middle">
                      <Image src={googleicon} alt="" />
                      Google
                    </button>
                    <button className="bg-white hover:bg-foundation-purple-purple-400 rounded-2xl border-2 outline-none border-foundation-grey-grey-300 border-solid cursor-pointer flex items-center justify-center font-semibold py-2.5 px-6 gap-[10px] text-center align-middle">
                      <Image src={facebookicon} alt="" />
                      Facebook
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="h-auto bg-foundation-purple-purple-400 rounded-none rounded-tr-xl rounded-r-xl sm:px-0 px-4 w-full flex justify-center items-center pb-5">
            <Image
              src={authImage}
              alt=""
              className="max-w-[1580px] w-auto h-fit object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
