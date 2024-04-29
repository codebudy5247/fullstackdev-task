"use client";
import * as Api from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [profile, setProfile] = useState<Profile | null>();

  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getProfile();
      setProfile(res?.data);
    };
    init();
  }, []);

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">LOGO</h1>
        </Link>

        {profile && (
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
            <Link href="/profile">
              <h1 className="font-semibold"> Dr. {profile?.name}</h1>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
