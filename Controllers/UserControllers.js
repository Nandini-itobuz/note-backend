import personModel from "../Schemas/UserSchema.js";
import jwt from "jsonwebtoken"

export async function updateData(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await personModel.findByIdAndUpdate(
      { _id: req.params["id"] },
      { name: name, email: email, password: password },
      { new: true }
    );
    res.status(200).json({
      data: updatedUser,
      message: "Data Successfully updated!",
      status: 200,
    });
  } catch (e) {
    console.log("Unable to update!");
  }
}

export async function findData(req, res) {
  try {
    const findUser = await personModel.findById(req.params["id"]);
    if (!findUser) {
      res.status(404).send({
        data: findUser,
        message: "Data not found!",
        status: 404,
      });
    }
    res.status(200).send({
      data: findUser,
      message: "Data Successfully found!",
      status: 200,
    });
  } catch (e) {
    console.log("Data not found");
  }
}

export async function insertData(req, res) {
  try {
    const nameUser = req.body.name;
    const emailUser = req.body.email;
    const passwordUser = req.body.password;
    console.log(nameUser);

    if (!nameUser || !emailUser || !passwordUser) {
      res.status(404).json({
        data: null,
        message: "Unable to insert data",
        status: 404,
      });
    }
    const user = await personModel.create({
      name: nameUser,
      email: emailUser,
      password: passwordUser,
    });

    const token = jwt.sign({id: user._id},"ok");
    
    res.status(404).json({
      data:token,
      message: "Data inserted succesfully",
      status: 200,
    });
  } catch (e) {
    console.log("error in inserting data");
  }
}

