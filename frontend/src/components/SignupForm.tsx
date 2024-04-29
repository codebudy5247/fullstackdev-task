"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Api from "@/services/api";
import { toast } from "react-hot-toast";

const SignupForm = () => {
  const router = useRouter();
  const [doctor, setDoctor] = useState({
    name: "",
    contact: "",
    password: "",
    specialty: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onRegister = async () => {
    setLoading(true);
    const [err, res] = await Api.register(
      doctor.name,
      doctor.contact,
      doctor.password,
      doctor.specialty
    );
    if (err) {
      toast.error(err.data);
    }
    if (res) {
      console.log("Signup success", res);
      toast.success("Signup success");
      router.push("/login");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      doctor.contact.length > 0 &&
      doctor.password.length > 0 &&
      doctor.name.length > 0 &&
      doctor.specialty.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [doctor]);
  return (
    <div className="relative space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10 border border-gray-100">
      <h1 className="text-xl font-semibold lg:text-2xl">Register</h1>
      <p className="pb-4 text-gray-500">Register a new account</p>
      <div className="">
        <label className=""> Name </label>
        <input
          type="text"
          placeholder="name"
          className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          value={doctor.name}
          onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
        />
      </div>

      <div className="">
        <label className=""> Contact </label>
        <input
          type="text"
          placeholder="contact"
          className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          value={doctor.contact}
          onChange={(e) => setDoctor({ ...doctor, contact: e.target.value })}
        />
      </div>

      <div>
        <label className=""> Password </label>
        <input
          type="password"
          placeholder="******"
          className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          value={doctor.password}
          onChange={(e) => setDoctor({ ...doctor, password: e.target.value })}
        />
      </div>

      <div className="">
        <label className=""> Speciality </label>
        <input
          type="text"
          placeholder="speciality"
          className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          value={doctor.specialty}
          onChange={(e) => setDoctor({ ...doctor, specialty: e.target.value })}
        />
      </div>

      <div>
        <button
          disabled={buttonDisabled}
          onClick={onRegister}
          className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
        >
         {loading ? "loading..." : "Signup"} 
        </button>
      </div>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
