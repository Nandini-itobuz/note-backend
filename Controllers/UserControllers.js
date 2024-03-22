import personModel from "../Schemas/UserSchema.js";
import jwt from "jsonwebtoken";


export async function updateData(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = await personModel.findByIdAndUpdate(
      { _id: req.params["id"] },
      { name: name, email: email, password: password },
      { new: true }
    );
    if (!user) throw new Error("Error in updating data");
    res.status(200).json({
      data: user,
      message: "Data Successfully updated!",
      status: 200,
    });
  } catch (e) {
    res.status(404).json({
      data: null,
      message: e.message,
      status: 404,
    });
  }
}

export async function findData(req, res) {
  try {
    const findUser = await personModel.findById(req.params["id"]);
    res.status(200).send({
      data: findUser,
      message: "Data Successfully found!",
      status: 200,
    });
  } catch (e) {
    res.status(404).send({
      data: null,
      message: e.message,
      status: 404,
    });
  }
}

export async function insertData(req, res) {
  try {
    const nameUser = req.body.name;
    const emailUser = req.body.email;
    const passwordUser = req.body.password;

    const alreadyExists = await personModel.find({ email: emailUser });
    if (!nameUser || !emailUser || !passwordUser)
      throw new Error("Invalid input");
    if (alreadyExists.length > 0) throw new Error("Email already exists");

    const user = await personModel.create({
      name: nameUser,
      email: emailUser,
      password: passwordUser,
    });
    const token = jwt.sign({ id: user._id }, "ok");
    res.status(404).json({
      data: token,
      message: "Data inserted succesfully",
      status: 200,
    });
  } catch (e) {
    res.status(404).json({
      data: null,
      message: e.message,
      status: 404,
    });
  }
}

export async function deleteData(req, res) {
  try {
    const deletedUser = await personModel.findByIdAndDelete({
      _id: req.params["id"],
    });
    if (!deletedUser) throw new Error("Unable to delete user");
    res.status(200).json({
      data: deletedUser,
      message: "Successfully deleted",
      status: 200,
    });
  } catch (e) {
    res.status(400).json({
      data: null,
      message: e.message,
      status: 400,
    });
  }
}

export function defaultRoutes(req, res) {
  res.status(400).json({
    data: null,
    message: "bad-gateway",
    status: 404,
  });
}
