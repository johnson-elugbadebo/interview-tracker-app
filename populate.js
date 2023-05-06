import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Job from './models/Job.js';

const populateDB = async function () {
	try {
		await connectDB(process.env.MONGO_URL);
		// await Job.deleteMany();

		const jsonJobs = JSON.parse(await readFile(new URL('./mock-data.json', import.meta.url)));
		await Job.create(jsonJobs);
		console.log('Success - data created!!!');
		// exit with 0 on success
		process.exit(0);
	} catch (error) {
		console.log(error);
		// exit with 1 on error
		process.exit(1);
	}
};

populateDB();
