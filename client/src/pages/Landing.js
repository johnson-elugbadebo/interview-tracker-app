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
							<ul>
								<li>
									<strong>BUILT BY:</strong> JOHNSON ELUGBADEBO
								</li>
								<li>
									<strong>DATE:</strong> SPRING 2023
								</li>
								<li>
									<strong>LOCATION:</strong> CAMBRIDGE, MA
								</li>
								<li>
									<strong>TECHNOLOGY STACK:</strong> MERN
									<ul>
										<li className='sub-item'>Database: MongoDB</li>
										<li className='sub-item'>Backend framework: Express.js</li>
										<li className='sub-item'>Frontend framework: React.js</li>
										<li className='sub-item'>Server language: Node.js</li>
									</ul>
								</li>
							</ul>
						</p>

						<p></p>

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
