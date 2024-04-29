import { NextFunction, Request, Response, CookieOptions } from "express";
import { prismaClient } from "../app";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

let jwtSecret = process.env.JWT_SECRET as string;

//Register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, contact, password, specialty } = req.body;
    let doctor = await prismaClient.doctor.findFirst({
      where: { contact: contact },
    });
    if (doctor) {
      throw new Error("Doctor already exist!");
    }

    let newDoctor = await prismaClient.doctor.create({
      data: {
        name: name,
        contact: contact,
        password: hashSync(password, 10),
        specialty: specialty,
      },
    });
    res.status(201).json(newDoctor);
  } catch (error) {
    next(error);
  }
};

//Login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { contact, password } = req.body;

    let doctor = await prismaClient.doctor.findFirst({
      where: { contact: contact },
    });
    if (!doctor) throw new Error("Doctor not found");

    if (!compareSync(password, doctor.password))
      throw new Error("Incorrect password");

    const accessToken = jwt.sign(
      {
        doctorId: doctor.id,
      },
      jwtSecret
    );
    res.status(200).json({ doctor, accessToken });
  } catch (error) {
    next(error);
  }
};

//Profile
export const me = async (req: Request, res: Response) => {
  const user = res.locals.user;
  res.json(user);
};
