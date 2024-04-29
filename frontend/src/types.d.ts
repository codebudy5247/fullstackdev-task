type Profile = {
  id: string;
  name: string;
  contact: string;
  password: string;
  specialty: string;
  createdAt: string;
  updatedAt: string;
};

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  bloodtype: string;
  address: string;
  phone: string;
  doctorId: string;
  medicalHistory:string;
};
