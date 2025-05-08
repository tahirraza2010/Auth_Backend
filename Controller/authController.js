import bcrypt from "bcryptjs";
import userModel from "../models/userSchema.js";

// Signup API
export const authController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const userObj = {
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    };

    const saveData = await userModel.create(userObj);

    return res.status(200).json({
      message: "Signup successfully.",
      user: saveData,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

// Login API
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Required fields are missing.",
      });
    }

    const emailExist = await userModel.findOne({ email });

    if (!emailExist) {
      return res.status(400).json({
        message: "Invalid email & password.",
      });
    }

    const comparePassword = await bcrypt.compare(password, emailExist.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "Invalid email & password.",
      });
    }

    return res.status(200).json({
      message: "Login successfully.",
      user: {
        id: emailExist._id,
        email: emailExist.email,
        name: `${emailExist.firstName} ${emailExist.lastName}`,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};
