"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Api from "@/services/api";
import { toast } from "react-hot-toast";

const AddPateintPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pateint, setPateint] = useState({
    name: "",
    age: 0,
    gender: "",
    bloodtype: "",
    address: "",
    phone: "",
    medicalHistory:""
  });

  const addPateintHandler = async () => {
    setLoading(true);
    const [err, res] = await Api.addPateint(
      pateint.name,
      pateint.age,
      pateint.gender,
      pateint.bloodtype,
      pateint.address,
      pateint.phone,
      pateint.medicalHistory
    );

    if (res) {
      toast.success("Pateint added");
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="p-20 m-auto">
      <div className="relative space-y-3 rounded-md p-6 lg:p-10 border border-gray-100">
        <h1 className="text-xl font-semibold lg:text-2xl">Add Pateint</h1>
        <div>
          <label className=""> Name </label>
          <input
            type="text"
            placeholder="name"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            value={pateint.name}
            onChange={(e) => setPateint({ ...pateint, name: e.target.value })}
          />
        </div>

        <div>
          <label className=""> Age </label>
          <input
            type="number"
            placeholder="age"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            value={pateint.age}
            onChange={(e) =>
              setPateint({ ...pateint, age: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <label className=""> Gender </label>
          <input
            type="text"
            placeholder="gender"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            value={pateint.gender}
            onChange={(e) => setPateint({ ...pateint, gender: e.target.value })}
          />
        </div>

        <div>
          <label className=""> Blood Type </label>
          <input
            type="text"
            placeholder="bloodtype"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            value={pateint.bloodtype}
            onChange={(e) =>
              setPateint({ ...pateint, bloodtype: e.target.value })
            }
          />
        </div>

        <div>
          <label className=""> Address </label>
          <input
            type="text"
            placeholder="address"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            value={pateint.address}
            onChange={(e) =>
              setPateint({ ...pateint, address: e.target.value })
            }
          />
        </div>

        <div>
          <label className=""> Phone </label>
          <input
            type="text"
            placeholder="phone"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            value={pateint.phone}
            onChange={(e) => setPateint({ ...pateint, phone: e.target.value })}
          />
        </div>

        <div>
          <label className=""> Medical History </label>
          <input
            type="text"
            placeholder="medical history"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            value={pateint.medicalHistory}
            onChange={(e) => setPateint({ ...pateint, medicalHistory: e.target.value })}
          />
        </div>

        <div>
          <button
            disabled={loading}
            onClick={addPateintHandler}
            className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          >
            {loading ? "Adding...":"Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPateintPage;
