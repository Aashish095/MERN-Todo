import express from "express";
import {
  createDetails,
  deleteOneDetails,
  findOneDetails,
  getAllDetails,
  updateOneDetails,
} from "../controllers/users";

const router = express.Router();

router.post("/create", createDetails);
router.get("/all", getAllDetails);
router.get("/get/:id", findOneDetails);
router.post("/update/:id", updateOneDetails);
router.post("/delete/:id", deleteOneDetails);

export { router };
