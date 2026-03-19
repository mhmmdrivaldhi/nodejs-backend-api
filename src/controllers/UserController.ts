import { Request, Response } from "express";
import Users from "../db/models/User";
import { ErrorResponse, SuccessResponse } from "../helper/Helper";
import PasswordHelper from "../helper/PasswordHelper";

export const registerUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            res.status(400).send(ErrorResponse("All fields are required", null));
            return;
        }

        const passwordHashed = await PasswordHelper.PasswordHasing(password);


        const user = await Users.create({
            name,
            email,
            password: passwordHashed,
            roleId: 1,
            active: true,
            verified: true,
        })

        res.status(201).send(SuccessResponse("User registered successfully", user));

    } catch (error) {
        res.status(500).send(ErrorResponse("", error));
        return;
    }
}

export const getUsers = async(req: Request, res: Response): Promise<void> => {
    try {
        const users = await Users.findAll({
            where: { active: true }
        })
        res.status(200).send(SuccessResponse("Users retrieved successfully", users));
    } catch (error) {
        res.status(500).send(ErrorResponse("", error));
        return;
    }
}

export const getUserById = async(req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).send(ErrorResponse("Invalid user ID", null));
            return;
        }

        const user = await Users.findByPk(id);
        if (!user) {
            res.status(404).send(ErrorResponse("User not found", null));
            return;
        }

        res.status(200).send(SuccessResponse("User retrieved successfully", user));
    } catch (error) {
        res.status(500).send(ErrorResponse("", error));
        return;
    }
}

export const updateUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).send(ErrorResponse("Invalid user ID", null));
            return;
        }
        const user = await Users.findByPk(id);
        if (!user) {
            res.status(404).send(ErrorResponse("User not found", null));
            return;
        }

        const { name, email, password, roleId } = req.body;
        if (!name && !email && !password && roleId === undefined) {
            res.status(400).send(ErrorResponse("At least one field is required to update", null));
            return;
        }

        user.name = name;
        user.email = email;
        user.password = password;
        user.roleId = roleId;

        await user.save();
        res.status(200).send(SuccessResponse("User updated successfully", user));
    } catch (error) {
       res.status(500).send(ErrorResponse("", error)) 
       return
    }
}

export const deleteUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).send(ErrorResponse("Invalid user ID", null));
            return;
        }
        
        const user = await Users.findByPk(id);
        if (!user) {
            res.status(404).send(ErrorResponse("User not found", null));
            return;
        }

        // if (user?.roleId != 1 && user?.roleId != 2) {
        //     res.status(403).send(ErrorResponse("You are not authorized to delete this user", null));
        //     return;
        // }

        await user.destroy();
        res.status(200).send(SuccessResponse("User deleted successfully", null));
    } catch (error) {
        res.status(500).send(ErrorResponse("An error occurred while deleting the user", error));
        return;
    }
}