"use client";
import NavButton from "@/components/_landingpgComponents/navButton";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useLogin } from "@/hooks/mutate";
import { loginFormSchema } from "@/lib/api/definition";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { authImage, googleicon, logoxyz } from "../../../../../public";
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
        onError(error) {
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
    <section className="bg-foundation-purple-purple-900 flex justify-center items-start lg:items-center text-gray-500 lg:p-28 h-screen relative overflow-hidden">
      {isPending && <LoadingOverlay />}
      <div className="py-6 px-6 sm:px-16 w-full mt-8 xl:mt-12 lg:mt-0 relative z-10">
        <div className="w-full flex flex-col md:flex-row justify-center items-start lg:gap-x-4 rounded-xl shadow-lg bg-foundation-black-black-500/80 backdrop-blur-md">
          <div className="lg:max-w-[520px] flex h-auto w-full flex-col justify-between items-start text-start px-8 xl:px-16 py-2 md:py-0">
            <div className="mb-2 xl:mb-0 flex justify-start items-center gap-x-2 lg:mt-4">
              <Link href={"/"}>
                <Image
                  src={logoxyz}
                  alt=""
                  className="w-[70px] h-5 object-contain"
                />
              </Link>
            </div>
            <div className="flex flex-col w-full justify-center items-center text-base font-inter mt-7">
              <div className="lg:max-w-[450px] md:w-full flex flex-col justify-start text-start items-center">
                <h2 className="w-full font-normal text-start text-foundation-white-white-400 text-lg xl:text-3xl xl:my-2.5 leading-tight font-DmSans">
                  Login using your credentials
                </h2>

                <form
                  className="w-full"
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      htmlFor="email_address"
                      className="block mb-1.5 xl:mb-2.5"
                    >
                      <span className="text-foundation-grey-grey-300 text-sm xl:text-[0.9rem]">
                        Email Address
                      </span>
                      <input
                        type="email"
                        id="email_address"
                        placeholder="Enter your email address"
                        className="px-2 xl:px-4 py-0.5 lg:py-1.5 xl:py-3 mt-0.5 xl:mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                        {...register("email_address", {
                          required: true,
                        })}
                      />
                      {/* error handler */}
                      {errors.email_address && (
                        <span className="error-message px-2 text-red-500">
                          {errors.email_address.message}
                        </span>
                      )}
                    </label>

                    <label className="block mb-1.5 xl:mb-2.5">
                      <span className="text-foundation-grey-grey-300 text-sm xl:text-[0.9rem]">
                        Password
                      </span>
                      <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        className="px-2 xl:px-4 py-0.5 lg:py-1.5 xl:py-3 mt-0.5 xl:mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                        {...register("password", {
                          required: true,
                        })}
                      />
                      {/* error handler */}
                      {errors.password && (
                        <span className="error-message px-2 text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                    </label>
                    <p className="text-sm text-foundation-grey-grey-300 text-start my-1.5">
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
                  <NavButton styles="w-full my-1 xl:mb-2.5 xl:mt-1.5 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md py-0.5 xl:py-1.5 transition-all duration-300">
                    {isPending ? "Logging in..." : "Login"}
                  </NavButton>
                  {/* <div className="flex justify-center mb-3 xl:mb-3.5 gap-1.5 xl:gap-2.5 text-gray-700 text-[14.5px] xl:text-[18px] mt-4 xl:mt-6">                    <button className="relative bg-foundation-purple-purple-400 text-white rounded-2xl border-2 border-transparent cursor-pointer flex items-center justify-center font-semibold py-2.5 px-6 gap-[10px] text-center align-middle transition-all duration-300 hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200">
                      <Image
                        src={googleicon}
                        alt="Google icon"
                        className="filter brightness-0 invert"
                      />
                      <span className="relative z-10 glow-effect">
                        Sign in with Google
                      </span>
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-foundation-purple-purple-300 to-foundation-purple-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                    </button>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
          <div className="hidden h-auto bg-foundation-purple-purple-400 rounded-none rounded-tr-xl rounded-r-xl sm:px-0 px-4 w-full lg:flex justify-center items-center pb-5">
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
