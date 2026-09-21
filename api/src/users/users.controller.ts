import { Request, Response } from "express";

import { createUser, getUsers } from "./users.service";

//create a new user
export const createUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({
        message: "First name, email, and password are required",
      });
    }

    const user = await createUser(
      firstName,
      lastName,
      email,
      phone,
      password,
    );

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

//get all users
export const getUsersController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const users = await getUsers();

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Failed to get users:", error);

    return res.status(500).json({
      message: "Failed to get users",
    });
  }
};