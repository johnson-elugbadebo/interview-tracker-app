// Import Mongoose
import mongoose from 'mongoose';

// Create Schema, which defines Structure for the Document you're creating
// Add in Validation into Schema with properties for each field
// A Model is a Wrapper for the Schema, an Interface to the DB
// Using a model, you can easily perform CRUD on your DB
const JobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, 'Please provide company'],
			trim: true,
			maxLength: [40, 'Company cannot be more than 40 characters'],
			minLength: [2, 'Company must be at least 2 characters'],
		},
		position: {
			type: String,
			required: [true, 'Please provide position'],
			trim: true,
			maxLength: [100, 'Position cannot be more than 100 characters'],
			minLength: [2, 'Position must be at least 2 characters'],
		},
		status: {
			type: String,
			enum: ['Interview', 'Declined', 'Pending'],
			default: 'Pending',
		},
		jobType: {
			type: String,
			enum: ['Full-time', 'Part-time', 'Remote', 'Internship'],
			default: 'Full-time',
		},
		jobLocation: {
			type: String,
			required: [true, 'Please provide job location'],
			default: 'My City',
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
	},
	{ timestamps: true }
);

// Compile model from Schema
// Parameters when exporting are model name and schema
export default mongoose.model('Job', JobSchema);
