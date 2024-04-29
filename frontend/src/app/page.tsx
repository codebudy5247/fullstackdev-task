"use client";
import { useRouter } from "next/navigation";
import * as Api from "@/services/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem("access_token") as string;

  const [pateints, setPateints] = useState<Patient[] | null>();

  if (!token) {
    router.push("/login");
  }

  const getPateints = async () => {
    const [err, res] = await Api.getPateints();
    if (res) {
      setPateints(res?.data);
    }
  };

  useEffect(() => {
    const init = () => {
      getPateints();
    };
    init();
  }, []);

  const deletePateintHandler = async (pateintId: string) => {
    const [err, res] = await Api.deletePateint(pateintId);

    if (res) {
      getPateints();
    }
  };

  return (
    <div className="p-20 m-auto">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Pateints</h1>
        <div>
          <Link href="/pateint/new">
            <button className="w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring">
              Add new pateint
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        {pateints &&
          pateints.map((pateint) => (
            <div key={pateint.id}>
              <div className="flex justify-between items-center bg-white mt-5 p-5 rounded-lg shadow-xl">
                <div className="flex gap-3">
                  <h1 className="font-bold">{pateint?.name}</h1>
                  <h1>Age:{pateint?.age}</h1>
                  <h1>Blood Type:{pateint?.bloodtype}</h1>
                </div>

                <div className="flex gap-2">
                  <Link href={`/pateint/${pateint.id}`}>
                    <button className="w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring">
                      Details
                    </button>
                  </Link>
                  <button
                    onClick={() => deletePateintHandler(pateint.id)}
                    className="w-full rounded-md bg-red-400 p-2 text-center font-semibold text-white outline-none focus:ring"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
