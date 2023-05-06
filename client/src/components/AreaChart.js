import {
	ResponsiveContainer,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

function AreaChartComponent({ data }) {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<AreaChart data={data} margin={{ top: 50 }}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dateKey='date' />
				<YAxis allowDecimals={false} />
				<Tooltip />
				<Area type='monotone' dataKey='count' stroke='#186ade' fill='#8cb5ef' />
			</AreaChart>
		</ResponsiveContainer>
	);
}
export default AreaChartComponent;
