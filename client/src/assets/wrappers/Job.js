import styled from 'styled-components';

const Wrapper = styled.article`
	background: var(--white);
	border-radius: var(--borderRadius);
	display: grid;
	grid-template-rows: 1fr auto;
	box-shadow: var(--shadow-2);

	header {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--grey-200);
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		h5 {
			letter-spacing: 0;
		}
	}
	.main-icon {
		width: 60px;
		height: 60px;
		display: grid;
		place-items: center;
		background: var(--primary-500);
		border-radius: var(--borderRadius);
		font-size: 1.5rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--white);
		margin-right: 2rem;
	}
	.info {
		h5 {
			margin-bottom: 0.25rem;
		}
		p {
			margin: 0;
			text-transform: capitalize;
			color: var(--grey-400);
			letter-spacing: var(--letterSpacing);
		}
	}
	.pending {
		background: #fbf6e8;
		color: #d9a514;
	}
	.interview {
		background: #e6f2ee;
		color: #077d55;
	}
	.declined {
		color: #d91f11;
		background: #fbe9e7;
	}
	.content {
		padding: 1rem 1.5rem;
	}
	.content-center {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 0.5rem;
		@media (min-width: 576px) {
			grid-template-columns: 1fr 1fr;
		}
		@media (min-width: 992px) {
			grid-template-columns: 1fr;
		}
		@media (min-width: 1120px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.status {
		border: var(--border-2);
		border-radius: var(--borderRadius);
		text-transform: capitalize;
		letter-spacing: var(--letterSpacing);
		text-align: center;
		width: 100px;
		height: 30px;
	}
	footer {
		margin-top: 1rem;
	}
	.edit-btn,
	.delete-btn {
		letter-spacing: var(--letterSpacing);
		cursor: pointer;
		height: 30px;
	}
	.edit-btn {
		color: var(--green-dark);
		background: var(--green-light);
		margin-right: 0.5rem;
	}
	.delete-btn {
		color: var(--red-dark);
		background: var(--red-light);
	}

	.edit-btn:hover {
		background: var(--green-dark);
		color: var(--white);
	}

	.delete-btn:hover {
		background: var(--red-dark);
		color: var(--white);
	}

	&:hover .actions {
		visibility: visible;
	}
`;

export default Wrapper;
