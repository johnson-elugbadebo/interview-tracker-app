import express from 'express';
const router = express.Router();
import {
	createJob,
	deleteJob,
	getAllJobs,
	updateJob,
	showStats,
} from '../controllers/jobsController.js';
import authenticateUserMiddleware from '../middleware/authenticate.js';
import testUserMiddleware from '../middleware/testUser.js';

// Get: Get all the Tasks; app.get('/api/v1/tasks')
// Post: Create a New Task; app.post('/api/v1/tasks')
// Get: Get a Single Task; app.get('/api/v1/tasks/:id')
// Patch: Update Task; app.patch('/api/v1/tasks/:id')
// Put: replaces existing document
// Delete: Delete Task; app.delete('/api/v1/tasks/:id')
// Put: replaces existing document
// Patch: partially updates existing document
// Patch: only resource you pass in is updated, rest of document stays the same

router.post('/', authenticateUserMiddleware, testUserMiddleware, createJob);
router.get('/', authenticateUserMiddleware, getAllJobs);
// place stats route before :id
router.get('/stats', authenticateUserMiddleware, showStats);
router.delete('/:id', authenticateUserMiddleware, testUserMiddleware, deleteJob);
router.patch('/:id', authenticateUserMiddleware, testUserMiddleware, updateJob);

export default router;
