"use client";
import * as Api from "@/services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>();

  const [updatedProfile, setUpdatedProfile] = useState({
    name: "",
    specialty: "",
  });

  const getProfile = async () => {
    const [err, res] = await Api.getProfile();
    setProfile(res?.data);
  };

  useEffect(() => {
    const init = async () => {
      getProfile();
    };
    init();
  }, []);

  const updateProfileHandler = async () => {
    let update_profile_name =
      updatedProfile.name === "" ? profile?.name : updatedProfile.name;
    let update_profile_specialty =
      updatedProfile.specialty === ""
        ? profile?.specialty
        : updatedProfile.specialty;

    const [err, res] = await Api.updateProfile(
      profile?.id!,
      update_profile_name,
      update_profile_specialty
    );
    if (res) {
      console.log(res);
      getProfile();
      toast.success("Profile updated");
    }
  };

  return (
    <div className="p-20 m-auto">
      <h1 className="text-5xl font-semibold">Profile</h1>

      <div className="flex flex-col gap-2 mt-5">
        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-semibold">Name:</h1>
          <input
            type="text"
            placeholder="name"
            className="mt-2 h-12 rounded-md bg-gray-100 px-3 outline-none focus:ring"
            defaultValue={profile?.name}
            onChange={(e) =>
              setUpdatedProfile({ ...updatedProfile, name: e.target.value })
            }
          />
        </div>
        <div className="flex gap-2">
          <h1 className="text-lg font-semibold">Contact:</h1>
          <h1 className="text-lg">{profile?.contact}</h1>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-semibold">Speciality:</h1>
          <input
            type="text"
            placeholder="name"
            className="mt-2 h-12 rounded-md bg-gray-100 px-3 outline-none focus:ring"
            defaultValue={profile?.specialty}
            onChange={(e) =>
              setUpdatedProfile({
                ...updatedProfile,
                specialty: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div>
        <button
          onClick={updateProfileHandler}
          className="mt-5 rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
