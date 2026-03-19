import validator from 'validatorjs';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../../helper/Helper';
import Users from '../../db/models/User';

const RegisterValidator = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password, confirmPassword} = req.body;
        const data = {
            name,
            email,
            password,
            confirmPassword
        };
        
        const rules: Validator.Rules = {
            name: 'required|string|min:8|max:50',
            email: 'required|email',
            password: 'required|min:8|max:50',
            confirmPassword: 'required|same:password'
        }
    
        const validate = new validator(data, rules);
        if (validate.fails()) {
            return res.status(400).send(ErrorResponse("Bad Request", validate.errors))
        }

        const user = await Users.findOne({
            where: {
                email: data.email
            }
        });
    
        if (user) {
            const errorData = {
                errors: {
                    email: ['Email already exists']
                
                }
            }
            return res.status(400).send(ErrorResponse("Bad Request", errorData))
        }

        next();
    } catch (error) {
        res.status(500).send(ErrorResponse("Internal Server Error", error))
    }
}

export default RegisterValidator;