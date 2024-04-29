"use client";
import { useParams } from "next/navigation";
import * as Api from "@/services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PateintDetailPage = () => {
  const params = useParams();
  let pateintId = params.pateintId as string;

  const [pateint, setPateint] = useState<Patient | null>();

  const [updatedPateint, setUpdatedPateint] = useState({
    name: "",
    age: 0,
    gender: "",
    bloodtype: "",
    address: "",
    phone: "",
    medicalHistory: "",
  });

  const getPateint = async () => {
    const [err, res] = await Api.getPateint(pateintId);
    if (res) {
      setPateint(res?.data);
    }
  };

  useEffect(() => {
    const init = async () => {
      getPateint();
    };
    init();
  }, [pateintId]);

  const updatePateintHandler = async () => {
    let update_pateint_name =
      updatedPateint.name === "" ? pateint?.name : updatedPateint.name;
    let update_pateint_age =
      updatedPateint.age === 0 ? pateint?.age : updatedPateint.age;
    let update_pateint_gender =
      updatedPateint.gender === "" ? pateint?.gender : updatedPateint.gender;
    let update_pateint_bloodtype =
      updatedPateint.bloodtype === ""
        ? pateint?.bloodtype
        : updatedPateint.bloodtype;
    let update_pateint_address =
      updatedPateint.address === "" ? pateint?.address : updatedPateint.address;
    let update_pateint_phone =
      updatedPateint.phone === "" ? pateint?.phone : updatedPateint.phone;
    let update_pateint_medicalHistory =
      updatedPateint.medicalHistory === ""
        ? pateint?.medicalHistory
        : updatedPateint.medicalHistory;

    const [err, res] = await Api.updatePateint(
      pateintId,
      update_pateint_name,
      update_pateint_age,
      update_pateint_gender,
      update_pateint_bloodtype,
      update_pateint_address,
      update_pateint_phone,
      update_pateint_medicalHistory
    );

    if (res) {
      toast.success("Pateint profile updated")
      getPateint()
    }
  };

  return (
    <div className="p-20 m-auto">
      <h1 className="text-5xl font-semibold">Pateint Details</h1>

      <div className="flex flex-col gap-2 mt-5">
        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-bold">Name:</h1>
          <input
            type="text"
            placeholder="name"
            className="mt-2 h-12 rounded-md bg-gray-100 px-3 outline-none focus:ring"
            defaultValue={pateint?.name}
            onChange={(e) =>
              setUpdatedPateint({ ...updatedPateint, name: e.target.value })
            }
          />
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-semibold">Age:</h1>
          <input
            type="nunber"
            placeholder="age"
            className="mt-2 h-12 rounded-md bg-gray-100 px-3 outline-none focus:ring"
            defaultValue={pateint?.age}
            onChange={(e) =>
              setUpdatedPateint({
                ...updatedPateint,
                age: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-semibold">Gender:</h1>
          <input
            type="text"
            placeholder="gender"
            className="mt-2 h-12 rounded-md bg-gray-100 px-3 outline-none focus:ring"
            defaultValue={pateint?.gender}
            onChange={(e) =>
              setUpdatedPateint({ ...updatedPateint, gender: e.target.value })
            }
          />
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-semibold">Address:</h1>
          <input
            type="text"
            placeholder="address"
            className="mt-2 h-12 rounded-md bg-gray-100 px-3 outline-none focus:ring"
            defaultValue={pateint?.address}
            onChange={(e) =>
              setUpdatedPateint({ ...updatedPateint, address: e.target.value })
            }
          />
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-semibold">Contact:</h1>
          <input
            type="text"
            placeholder="contact"
            className="mt-2 h-12 rounded-md bg-gray-100 px-3 outline-none focus:ring"
            defaultValue={pateint?.phone}
            onChange={(e) =>
              setUpdatedPateint({ ...updatedPateint, phone: e.target.value })
            }
          />
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-semibold">Blood Type:</h1>
          <input
            type="text"
            placeholder="bloodtype"
            className="mt-2 h-12 rounded-md bg-gray-100 px-3 outline-none focus:ring"
            defaultValue={pateint?.bloodtype}
            onChange={(e) =>
              setUpdatedPateint({
                ...updatedPateint,
                bloodtype: e.target.value,
              })
            }
          />
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-semibold">Medical History:</h1>
          <input
            type="text"
            placeholder="medical history"
            className="mt-2 h-12 rounded-md bg-gray-100 px-3 outline-none focus:ring"
            defaultValue={pateint?.medicalHistory}
            onChange={(e) =>
              setUpdatedPateint({
                ...updatedPateint,
                medicalHistory: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div>
        <button
          onClick={updatePateintHandler}
          className="mt-5 rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default PateintDetailPage;
