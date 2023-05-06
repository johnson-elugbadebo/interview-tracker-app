import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';

// Jobs functions are async because we are communicating with database
// Order is not important

const createJob = async function (req, res) {
	const { position, company } = req.body;

	if (!position || !company) {
		throw new BadRequestError('Please provide all requested fields');
	}

	req.body.createdBy = req.user.userID;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async function (req, res) {
	console.log(req.user);
	const { status, jobType, sort, search } = req.query;

	const queryObject = {
		createdBy: req.user.userID,
	};
	// Add stuff based on conditions
	if (status && status !== 'All') {
		queryObject.status = status;
	}

	if (jobType && jobType !== 'All') {
		queryObject.jobType = jobType;
	}

	if (search) {
		// use mongoDB regex operator, case insensitive option
		queryObject.position = { $regex: search, $options: 'i' };
	}

	// NO AWAIT
	let result = Job.find(queryObject);

	// Chain sort conditions
	if (sort === 'Latest') {
		result = result.sort({ createdAt: -1 });
	}

	if (sort === 'Oldest') {
		result = result.sort({ createdAt: 1 });
	}

	if (sort === 'A-Z') {
		result = result.sort({ position: 1 });
	}

	if (sort === 'Z-A') {
		result = result.sort({ position: -1 });
	}

	// Setup Pagination
	// req.query.page & req.query.limit are strings, turn them to Numbers
	// default values are indicated after || syntax
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	// console.log(queryObject);
	const jobs = await result;

	const totalJobs = await Job.countDocuments(queryObject);
	const numOfPages = Math.ceil(totalJobs / limit);

	// Value 1 hardcoded for now
	res.status(StatusCodes.OK).json({ jobs, totalJobs: totalJobs, numOfPages: numOfPages });
};

const deleteJob = async function (req, res) {
	const { id: jobID } = req.params;

	const job = await Job.findOne({ _id: jobID });

	if (!job) {
		throw new NotFoundError(`No job with id ${jobID} exists`);
	}

	checkPermissions(req.user, job.createdBy);

	await job.remove();
	res.status(StatusCodes.OK).json({ msg: 'Success! Job removed.' });
};

const updateJob = async function (req, res) {
	const { id: jobID } = req.params;

	const { company, position } = req.body;

	if (!company || !position) {
		throw new BadRequestError('Please provide all requested fields');
	}

	const job = await Job.findOne({ _id: jobID });

	if (!job) {
		throw new NotFoundError(`No job with id ${jobID} exists`);
	}

	// Check permissions
	// console.log(typeof req.user.userID); string
	// console.log(typeof job.createdBy); object

	// Pass in entire user object so you can check for roles (admin, etc.)
	checkPermissions(req.user, job.createdBy);

	// There are alternative approaches to updating record, see ReadMe
	// FindOneAndUpdate does not trigger pre-save hook (there are no hooks in Job model)
	const updatedJob = await Job.findOneAndUpdate({ _id: jobID }, req.body, {
		new: true,
		// If property is not provided in req.body, no error is thrown
		// If you pass in property and its an empty value or it doesn't match what you require in database, it will throw error
		// runValidators only runs on properties you provide in req.body
		runValidators: true,
	});

	res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async function (req, res) {
	// use the aggregate method to aggregate our data
	let stats = await Job.aggregate([
		// req.user.userID is a string, ObjectId turns it into an object
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) } },
		{ $group: { _id: '$status', count: { $sum: 1 } } },
	]);

	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr;
		acc[title] = count;
		return acc;
	}, {});
	// console.log(stats);

	// Set defaults for when the user first registers and has no jobs so front end
	// doesn't break
	const defaultStats = {
		Declined: stats.Declined > 0 ? stats.Declined : 0,
		Pending: stats.Pending > 0 ? stats.Pending : 0,
		Interview: stats.Interview > 0 ? stats.Interview : 0,
	};
	// console.log(defaultStats);

	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) } },
		{
			$group: {
				_id: {
					year: {
						$year: '$createdAt',
					},
					month: {
						$month: '$createdAt',
					},
				},
				count: { $sum: 1 },
			},
		},
		{ $sort: { '_id.year': -1, '_id.month': -1 } },
		{ $limit: 6 },
	]);

	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = moment()
				.month(month - 1)
				.year(year)
				.format('MMM Y');
			return { date, count };
		})
		.reverse();
	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
