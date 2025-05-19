import { Note } from "../models/NoteModel.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    return res.status(200).json({
      status: "Success",
      message: "Users Retrieved",
      data: users,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }
    return res.status(200).json({
      status: "Success",
      message: "User Retrieved",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function createUser(req, res) {
  try {
    const { name, email, gender, password } = req.body;
    if (Object.keys(req.body).length < 4) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }
    const encryptPassword = await bcrypt.hash(password, 5);
    const newUser = await User.create({
      name: name,
      email: email,
      gender: gender,
      password: encryptPassword,
    });
    return res.status(201).json({
      status: "Success",
      message: "User Registered",
      data: newUser,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    let { password } = req.body;
    if (password) {
      const encryptPassword = await bcrypt.hash(password, 5);
      password = encryptPassword;
    }
    if (Object.keys(req.body).length < 4) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });
    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }
    const result = await User.update(
      { ...req.body, password },
      { where: { id: req.params.id } }
    );
    if (result[0] == 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }
    return res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });
    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }
    const result = await User.destroy({ where: { id: req.params.id } });
    if (result == 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }
    return res.status(200).json({
      status: "Success",
      message: "User Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const userPlain = user.toJSON();
      const { password: _, refresh_token: __, ...safeUserData } = userPlain;
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const accessToken = jwt.sign(
          safeUserData,
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
          safeUserData,
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        await User.update(
          { refresh_token: refreshToken },
          { where: { id: user.id } }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: false,
        });
        return res.status(200).json({
          status: "Success",
          message: "Login Successful",
          accessToken,
        });
      }
    }
    const error = new Error("Email atau password salah 😐");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204); // No Content
    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) return res.sendStatus(204);
    await User.update({ refresh_token: null }, { where: { id: user.id } });
    res.clearCookie("refreshToken");
    return res.status(200).json({ status: "Success", message: "Logout successful" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}


// GET
async function getNotes(req, res) {
    try {
        const response = await Note.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// GET NOTE BY ID
async function getNoteById(req, res) {
    try {
        const note = await Note.findOne({
            where: { id: req.params.id }
        });

        if (!note) {
            return res.status(404).json({ msg: "Catatan tidak ditemukan" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// CREATE
async function createNotes(req, res) {
    try {
        const inputResult = req.body;
        await Note.create(inputResult);
        res.status(201).json({ msg: "Note created" });
    } catch (error) {
        console.log(error.message);
    }
}

// UPDATE
async function updateNotes(req, res) {
    try {
        await Note.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "This Note Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

// DELETE
async function deleteNotes(req, res) {
    try {
        await Note.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "This Note Completed Detele" });
    } catch (error) {
        console.log(error.message);
    }
}

export {
  getNotes,
  getNoteById,
  createNotes,
  updateNotes,
  deleteNotes,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
};
