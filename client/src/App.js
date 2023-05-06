import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Landing, Error, Register, ProtectedRoute } from './pages/Index';
import { AddJob, Profile, AllJobs, Stats, SharedLayout } from './pages/Dashboard';
function App() {
	return (
		<BrowserRouter>
			{/* <nav>
				<Link to='/'>Dashboard</Link>
				<Link to='/register'>Register</Link>
				<Link to='/landing'>Landing</Link>
			</nav> */}
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}>
					<Route index element={<Stats />} />
					<Route path='all-jobs' element={<AllJobs />} />
					<Route path='add-jobs' element={<AddJob />} />
					<Route path='profile' element={<Profile />} />
				</Route>
				<Route path='/register' element={<Register />} />
				<Route path='/landing' element={<Landing />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
