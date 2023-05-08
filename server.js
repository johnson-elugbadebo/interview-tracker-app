// Import express package and and invoke it
import express from 'express';
const app = express();

// Import dotenv and invoke it
import dotenv from 'dotenv';
dotenv.config();

// Import express-async errors
import 'express-async-errors';

// Import Morgan Logger Middleware
import morgan from 'morgan';

// When using ES6 Modules, its tricky to get dirname
// In CommonJS, dirname is available by default, not so with ES6 modules
// Hence we get dirname, fileURLToPath, and path modules from node
// Path is a core Node library for parsing file and directory paths
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// SECURITY PACKAGES
// 1. Helmet - helps you secure your Express apps by setting various HTTP headers
// 2. XSS-Clean - Node.js Connect middleware to sanitize user inputs coming from POST body, GET queries, and url params.
// 3. Express Mongo Sanitize - Sanitizes user-supplied data to prevent MongoDB Operator Injection.
// 4. Express Rate Limit - Basic rate-limiting middleware for Express.
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

// Import DB connection function & authenticate user
import connectDB from './db/connect.js'; // must be above middleware

// Routers
import authRouter from './routes/authRoutes.js'; // must include .js
import jobsRouter from './routes/jobsRoutes.js'; // must include .js

// Middleware - Not Found, Error Handler, cookieParser
import notFoundMiddleware from './middleware/not-found.js'; // must include .js
import errorHandlerMiddleware from './middleware/error-handler.js'; // must include .js
import cookieParser from 'cookie-parser';

// Invoke morgan logger middleware only in dev environment
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

// Workaround to get dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Invoke static assets, only when ready to Deploy Application
// app.use(express.static(path.resolve(__dirname, './client/build')));

// Establish rate limiter middleware to all requests
app.set('trust proxy', 1);
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		message: 'Too many requests from this IP, please try again later.',
	})
);

// Establish Middleware (json), Makes json data available to us in controllers
app.use(express.json());

// Invoke Security Packages
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());

// Dummy Home Route
// app.get('/', (req, res) => {
// 	res.json({ msg: 'Welcome' });
// });

// Dummy Home Route
// app.get('/api/v1', (req, res) => {
// 	res.json({ msg: 'API' });
// });

// Establish Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

// Only when ready to deploy, Establish Get Route to point to Index.html (after the auth and jobs routes)
// app.get('*', function (req, res) {
// 	res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

// Invoke Not Found and Error Handler Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// Only start server if connection to database is successful, must be async
const startServer = async function () {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
