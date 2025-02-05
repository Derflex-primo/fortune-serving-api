import { Request, Response, NextFunction } from 'express';

export default function auth_development_bypass(req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV === 'development') {
        req.headers.authorization = `Bearer ${process.env.AUTH0_TOKEN}`;
        console.log('✅ Auth token injected!');
    }
    next();
}
