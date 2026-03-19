import express from 'express';
import { createRole, deleteRole, getRoleById, getRoles, updateRole } from '../controllers/RoleController';
import { deleteUser, getUserById, getUsers, registerUser, updateUser } from '../controllers/UserController';

const router = express.Router();

router.get('/roles', getRoles);
router.get('/roles/:id', getRoleById);
router.post('/roles', createRole);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

router.post('/users/register', registerUser);
router.get('/users', getUsers);
router.get("/users/:id", getUserById)
router.put("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)

export default router;