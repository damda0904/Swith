import { config } from 'dotenv';
import nodemailer from 'nodemailer';

export async function login(req, res) {

}

export async function signup(req, res) {

}

export async function authEmail(req, res) {
    const email = req.body.email;

    let trasporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: config.gmail.address,
            password: config.gmail.passwd
        }
    })
}