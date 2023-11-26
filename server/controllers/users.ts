import express, { Request, Response } from "express";
import { entityManager } from "../config/data-source";
import { User } from "../entity/User";

const createDetails = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    let user = new User();
    console.log(user);
    user.name = name;
    user.email = email;
    user.phone = phone;
    let data = await entityManager.save(user);
    res.json({
      test: "OK",
      data,
    });
  } catch (e: any) {
    console.log("Error creating user data ", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllDetails = async (req: Request, res: Response) => {
  try {
    let data = await entityManager.find(User);
    res.json({
      status: "OK",
      data,
    });
  } catch (e: any) {
    console.log("Error creating user data ", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findOneDetails = async (req: Request, res: Response) => {
  try {
    console.log("Request data: ", req.params.id);
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    // let data = await entityManager.findOne(User, {
    //   where: { id: id },
    // });

    let query = entityManager
      .createQueryBuilder(User, "user")
      .where("user.id = :id", { id });

    const user = await query.getOne();
    if (user) {
      res.json({
        status: "OK",
        data: user,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (e: any) {
    console.log("Error creating user data ", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateOneDetails = async (req: Request, res: Response) => {
  try {
    console.log("Request data: ", req.params.id);
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const updateData: { [key: string]: number | string } = {};

    if (req.body.name) {
      updateData.name = req.body.name;
    }
    if (req.body.email) {
      updateData.email = req.body.email;
    }
    if (req.body.phone) {
      updateData.phone = req.body.phone;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No valid field to update" });
    }

    let result = await entityManager.update(User, id, updateData);
    if (result.affected === 1) {
      const updateData = await entityManager.findOne(User, {
        where: { id: id },
      });
      res.json({
        status: "OK",
        data: updateData,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (e: any) {
    console.log("Error creating user data ", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOneDetails = async (req: Request, res: Response) => {
  try {
    console.log("Request data: ", req.params.id);
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const existingUser = await entityManager.findOne(User, {
      where: { id: id },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let data = await entityManager.delete(User, id);
    if (data.affected === 1) {
      res.json({
        status: "OK",
        data: "Data is  deleted",
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (e: any) {
    console.log("Error creating user data ", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createDetails,
  getAllDetails,
  findOneDetails,
  updateOneDetails,
  deleteOneDetails,
};
