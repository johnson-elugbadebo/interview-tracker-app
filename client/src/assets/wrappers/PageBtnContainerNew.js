import styled from 'styled-components';

const Wrapper = styled.section`
	height: 6rem;
	margin-top: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;

	.pagination-container {
		display: flex;
		justify-content: center;
		gap: 0rem 0.1rem;
	}

	/* .btn-container {
		gap: 0rem 10px;
	} */

	.pageBtn,
	.dots {
		background: var(--grey-50);
		border-color: transparent;
		width: 50px;
		height: 40px;
		font-weight: 500;
		font-size: 1.05rem;
		color: var(--black);
		transition: var(--transition);
		border-radius: var(--borderRadius);
		cursor: pointer;
	}
	.active {
		background: var(--grey-50);
		border-color: var(--primary-500);
		color: var(--black);
	}
	.prev-btn,
	.next-btn {
		width: 75px;
		height: 40px;
		background: var(--primary-50);
		border-color: transparent;
		border-radius: var(--borderRadius);
		color: var(--black);
		text-transform: capitalize;
		letter-spacing: var(--letterSpacing);
		display: flex;
		align-items: center;
		justify-content: center;
		/* gap: 0.5rem; */
		cursor: pointer;
		transition: var(--transition);
	}
	.prev-btn:hover,
	.next-btn:hover {
		background: var(--primary-500);
		color: var(--white);
	}

	@media screen and (max-width: 570px) {
		.pageBtn,
		.dots {
			background: var(--grey-50);
			border-color: transparent;
			width: 33px;
			height: 33px;
			font-weight: 500;
			font-size: 1.05rem;
			color: var(--black);
			transition: var(--transition);
			border-radius: var(--borderRadius);
			cursor: pointer;
		}

		.prev-btn,
		.next-btn {
			width: 41px;
			height: 33px;
			background: var(--primary-500);
			border-color: transparent;
			border-radius: var(--borderRadius);
			color: var(--white);
			text-transform: capitalize;
			letter-spacing: var(--letterSpacing);
			display: flex;
			align-items: center;
			justify-content: center;
			/* gap: 0.5rem; */
			cursor: pointer;
			transition: var(--transition);
		}

		.active {
			background: var(--grey-50);
			border-color: var(--primary-500);
			color: var(--black);
		}
	}
`;
export default Wrapper;
