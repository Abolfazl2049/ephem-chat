import {RequestHandler} from "express";
import {User} from "./entities.js";
import {Identifier} from "sequelize";

const getMyProfile: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user as Identifier);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
export {getMyProfile};
