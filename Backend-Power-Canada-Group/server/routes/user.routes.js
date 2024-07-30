import express from "express";
import { hasAuthorization, requireSignin } from "../controllers/auth.controller.js";
import { create, list, read, remove, update, userByID } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/")
    .get(list)    // GET all users
    .post(create); // POST a new user

router.route("/signup")
    .post(create); // POST a new user at the signup route

router.route("/:userId")
    .get(requireSignin, read)    // GET a single user by ID
    .put(requireSignin, hasAuthorization, update)  // PUT update a user by ID
    .delete(requireSignin, hasAuthorization, remove);  // DELETE a user by ID

router.param("userId", userByID); // Parameter middleware to load user when 'userId' is part of the URL

export default router;
