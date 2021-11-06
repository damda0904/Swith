import { validationResult } from "express-validator"

export const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) { return next() }

    return res.status(400).json({ message: errors.array() });
}

export const checkEmail = (value) => {

    const address = value.split("@")[1]

    console.log("validate: " + address)

    if (!address === 'sookmyung.ac.kr' && !address === 'sm.ac.kr') {
        return false
    }
    return true;
}