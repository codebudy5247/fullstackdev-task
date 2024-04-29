"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Api from "@/services/api";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [doctor, setDoctor] = useState({
    contact: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const [err, res] = await Api.login(doctor.contact, doctor.password);
    if (err) {
      toast.error(err.data);
    }
    if (res) {
      localStorage.setItem("access_token", res.data.accessToken);
      toast.success("Login success");
      router.push("/");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (doctor.contact.length > 0 && doctor.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [doctor]);
  return (
    <div className="relative space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10 border border-gray-100">
      <h1 className="text-xl font-semibold lg:text-2xl">Login</h1>
      <p className="pb-4 text-gray-500">Sign in to access your account</p>
      <div className="">
        <label className=""> Mobile </label>
        <input
          type="text"
          placeholder="mobile"
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

      <div>
        <button
          disabled={buttonDisabled}
          onClick={onLogin}
          className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
        >
          {loading ? "loading..." : "Signin"}
        </button>
      </div>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
