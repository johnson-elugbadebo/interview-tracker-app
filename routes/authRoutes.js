import express from 'express';
const router = express.Router();
import {
	registerUser,
	login,
	updateUser,
	getCurrentUser,
	logOutUser,
} from '../controllers/authController.js';
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
// Put: replaces existing document
// Patch: partially updates existing document
// Patch: only resource you pass in is updated, rest of document stays the same

router.post('/register', registerUser);
router.post('/login', login);
router.patch('/updateUser', authenticateUserMiddleware, testUserMiddleware, updateUser);
router.get('/getCurrentUser', authenticateUserMiddleware, getCurrentUser);
router.get('/logout', logOutUser);

export default router;
