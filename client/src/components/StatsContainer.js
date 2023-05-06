import { useAppContext } from '../context/appContext';
import StatItem from './StatItem';
import { FaWpforms, FaCalendarCheck, FaRegThumbsDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';

function StatsContainer() {
	const { stats } = useAppContext();

	const defaultStats = [
		{
			title: 'pending applications',
			count: stats.Pending || 0,
			icon: <FaWpforms />,
			color: '#d9a514',
			bcg: '#fbf6e8',
		},
		{
			title: 'interviews scheduled',
			count: stats.Interview || 0,
			icon: <FaCalendarCheck />,
			color: '#077d55',
			bcg: '#e6f2ee',
		},
		{
			title: 'jobs declined',
			count: stats.Declined || 0,
			icon: <FaRegThumbsDown />,
			color: '#d91f11',
			bcg: '#fbe9e7',
		},
	];

	return (
		<Wrapper>
			{defaultStats.map((item, index) => {
				return <StatItem key={index} {...item} />;
			})}
		</Wrapper>
	);
}
export default StatsContainer;
