import passport from "passport";

declare global {
    namespace Express {
        interface User {
            id: number;
            name: string;
            email?: string;
            password?: string;
            role: string;
        }
    }
}

declare module "express-session" {
    interface SessionData {
        messages?: string[]
    }
}

declare namespace passport {
    interface Profile {
        role: string;
    }
}




export {}