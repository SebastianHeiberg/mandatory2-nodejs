import "dotenv/config"
import express, { urlencoded } from 'express'
import { rateLimit } from 'express-rate-limit'


const app = express()
app.use(express.json());
app.use(urlencoded({ extended: true }));

import helmet from "helmet";
app.use(helmet())

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

app.use("/auth", authRateLimiter)





//-----------------routers-------------------------------------

import authRouter from './public/routers/authRouter.js'
app.use(authRouter)

import emailRouter from './public/routers/mailRouter.js'
app.use(emailRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("App is running on: ", PORT)
})