import {Request, Response, NextFunction} from "express";

const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if(!token) {
        return res.status(401).json({error: 'Access denied'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = decodedToken.userId;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Unauthorized'})
    }
}

module.exports = authMiddleware;