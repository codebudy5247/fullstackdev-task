import { NextFunction, Request, Response, CookieOptions } from "express";
import { prismaClient } from "../app";

//Create pateint
export const createPateint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let doctor = res.locals.user;
    if (!doctor) {
      throw new Error("Doctor not found!");
    }
    let pateint = await prismaClient.patient.create({
      data: {
        ...req.body,
        doctorId: doctor.id,
      },
    });
    res.status(201).json(pateint);
  } catch (error) {
    next(error);
  }
};

//Get pateints
export const getPateints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let doctor = res.locals.user;
    if (!doctor) {
      throw new Error("Doctor not found!");
    }
    let pateints = await prismaClient.patient.findMany({
      where: {
        doctorId: doctor.id,
      },
    });

    res.status(200).json(pateints);
  } catch (error) {
    next(error);
  }
};

//Get pateint
export const getPateint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let pateint = await prismaClient.patient.findFirstOrThrow({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(pateint);
  } catch (error) {
    next(error);
  }
};

//Update pateint
export const updatePateint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pateint = req.body;
    const updatedPateint = await prismaClient.patient.update({
      where: {
        id: req.params.id,
      },
      data: pateint,
    });

    res.status(200).json(updatedPateint);
  } catch (error) {
    next(error);
  }
};

//Delete pateint
export const deletePateint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prismaClient.patient.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "success!" });
  } catch (error) {
    next(error);
  }
};

//Update Profile {doctor}
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = req.body;
    const updateProfile = await prismaClient.doctor.update({
      where:{
        id:req.params.id
      },
      data:profile
    })

    res.status(200).json(updateProfile)
  } catch (error) {
    next(error);
  }
};

