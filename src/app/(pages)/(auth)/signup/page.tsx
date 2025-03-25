"use client";

import NavButton from "@/components/_landingpgComponents/navButton";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useSignup } from "@/hooks/mutate";
import { signUpFormSchema } from "@/lib/api/definition";
import { setUser } from "@/redux/Slices/AuthSlice/authSlice";
import { useAppDispatch } from "@/redux/Store";
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
// import * as signup from '../../../../lib/api/signupApi'; i commented  this out ~ planner
import PasswordInput from "../_components/passwordInput";
import { emailRegex } from "../RegexFile";

type SignupData = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const dispatch = useAppDispatch();

  const { mutate: signupMutate, isPending } = useSignup();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signUpFormSchema),
  });

  // handle form submit
  const onSubmit: SubmitHandler<SignupData> = (data) => {
    signupMutate(
      {
        ...data,
      },
      {
        onSuccess: () => {
          const email = data?.email_address;

          dispatch(
            setUser({
              email: data?.email_address,
            })
          );

          if (email) {
            localStorage.setItem("local store email", email);
          }
        },
      }
    );
  };

  return (
    <section className="bg-foundation-white-white-400 flex justify-center items-center text-gray-500 lg:p-28 h-screen">
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
            <div className="flex flex-col w-full justify-center items-center text-base font-inter mb-1.5 mt-6">
              <div className="max-w-[450px] w-full flex flex-col justify-start text-start items-center">
                <h2 className="w-full font-normal text-start text-gray-700 mb-5 font-DmSans">
                  Create your XYZ account
                </h2>

                <form
                  method="POST"
                  className="w-full"
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
                          pattern: emailRegex,
                        })}
                      />
                      {/* error handler */}
                      {errors.email_address && (
                        <span
                          role="alert"
                          className="error-message px-2 text-[14px] text-red-400"
                        >
                          {errors.email_address.message}
                        </span>
                      )}
                    </label>

                    <label htmlFor="password" className=" block mb-2.5">
                      <span className=" text-foundation-grey-grey-900 text-[0.9rem]">
                        Password
                      </span>
                      <PasswordInput
                        id="password"
                        placeholder="Create password"
                        register={register("password")}
                        error={errors.password?.message}
                      />
                      {/* error handler */}
                      {errors.password && (
                        <span
                          role="alert"
                          className="error-message px-2 text-[14px] text-red-400"
                        >
                          {errors.password.message}
                        </span>
                      )}
                    </label>

                    <label htmlFor="confirmPassword" className=" block mb-2.5">
                      <span className=" text-foundation-grey-grey-900 text-[0.9rem]">
                        Confirm Password
                      </span>
                      <PasswordInput
                        id="password"
                        placeholder="Confirm password"
                        register={register("confirmPassword")}
                        error={errors.confirmPassword?.message}
                      />
                      {errors.confirmPassword && (
                        <span
                          role="alert"
                          className="error-message px-2 text-[14px] text-red-400"
                        >
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <NavButton styles="w-full mb-2.5 mt-1.5 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100 rounded-md py-1.5">
                    {isPending ? "Signing in..." : "Sign Up"}
                  </NavButton>
                  <p className="text-[0.9rem] text-gray-700 text-center">
                    already have an account{" "}
                    <a
                      href="/login"
                      className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                    >
                      Login
                    </a>
                  </p>
                  <div className="flex justify-center items-center">
                    <div className="w-[340px] relative h-10 text-[#d0d0d0] text-base my-4 flex justify-center items-center text-center">
                      <Image
                        className="absolute top-[20px] hidden sm:flex left-[0px] max-h-full w-[340px] ss:w-[300px]"
                        alt=""
                        src={vector102}
                      />
                      <div className="absolute top-[0px] sm:left-[100px] left-0 bg-white sm:w-[150px] w-full ss:left-[70px] flex flex-row items-center justify-center p-2.5 box-border">
                        <p className="relative tracking-[0.01em] leading-[140%] sm:text-nowrap text-wrap">
                          Or Sign Up using
                        </p>
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
            {/* <h3 className="md:w-[293px] w-full leading-[24px] text-base font-normal text-wrap text-[#d0d0d0]">
              © 2024 XYZ. All rights reserved.
            </h3> */}
          </div>
          <div className="h-full bg-foundation-purple-purple-400 rounded-none rounded-tr-xl rounded-r-xl sm:px-0 px-4 w-full flex justify-center items-center py-9">
            <Image
              src={authImage}
              alt=""
              className="max-w-[1580px] w-auto h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
