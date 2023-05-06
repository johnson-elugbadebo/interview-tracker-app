import { Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { Navbar, BigSidebar, SmallSidebar } from '../../components';

function SharedLayout() {
	return (
		<Wrapper>
			<main className='dashboard'>
				{/* Only 1 component is being rendered based on screen size */}
				<SmallSidebar />
				<BigSidebar />
				<div>
					<Navbar />
					<div className='dashboard-page'>
						<Outlet />
					</div>
				</div>
			</main>
		</Wrapper>
	);
}
export default SharedLayout;
