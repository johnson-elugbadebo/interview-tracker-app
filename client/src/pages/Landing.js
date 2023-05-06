import main from '../assets/images/main-new.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import React from 'react';

function Landing() {
	const { user } = useAppContext();

	return (
		<React.Fragment>
			{user && <Navigate to='/' />}
			<Wrapper>
				<nav>
					<Logo />
				</nav>
				<div className='container page'>
					{/* info */}
					<div className='info'>
						<h1>
							Interview <span>Tracker</span> Application
						</h1>
						<p>
							<strong>BUILT BY:</strong> JOHNSON ELUGBADEBO
						</p>
						<p>
							<strong>DATE:</strong> SPRING 2023
						</p>
						<p>
							<strong>LOCATION:</strong> CAMBRIDGE, MA
						</p>
						<p>
							<strong>TECHNOLOGY STACK:</strong> MERN
							<ul>
								<li>Database: MongoDB</li>
								<li>Backend framework: Express.js</li>
								<li>Frontend framework: React.js</li>
								<li>Server language: Node.js</li>
							</ul>
						</p>

						<Link to='/register' className='btn btn-hero'>
							Register / Login
						</Link>
					</div>
					{/* logo */}
					<img src={main} alt='job hunt' className='img main-img' />
				</div>
			</Wrapper>
		</React.Fragment>
	);
}

export default Landing;
