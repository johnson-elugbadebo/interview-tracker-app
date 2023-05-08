import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/PageBtnContainerNew';
import { usePagination, DOTS } from '../utils/usePagination';

function PageBtnContainerNew({ siblingCount = 1 }) {
	const { numOfPages, page, changePage } = useAppContext();

	const paginationRange = usePagination({
		siblingCount,
	});

	let lastPage = paginationRange[paginationRange.length - 1];

	// If there are less than 2 times in pagination range we shall not render the component
	if (page === 0 || paginationRange.length < 2) {
		return null;
	}

	const nextPage = function () {
		let newPage = page + 1;
		if (newPage > numOfPages) {
			// set newPage to first Page
			newPage = 1;
		}
		changePage(newPage);
	};

	const prevPage = function () {
		let newPage = page - 1;
		if (newPage < 1) {
			// set newPage to last Page
			newPage = numOfPages;
		}
		changePage(newPage);
	};

	return (
		<Wrapper>
			<div className='pagination-container'>
				{/* Left navigation arrow */}
				<button className='prev-btn' disabled={page === 1 ? true : false} onClick={prevPage}>
					prev
				</button>

				<div className='btn-container'>
					{paginationRange.map((pageNumber) => {
						// If the pageItem is a DOT, render the DOTS unicode character
						if (pageNumber === DOTS) {
							return <>&#8230;</>;
						}
						// Render our Page Pills
						return (
							<button
								type='button'
								className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
								key={pageNumber}
								onClick={() => {
									changePage(pageNumber);
								}}>
								{pageNumber}
							</button>
						);
					})}
				</div>

				{/*  Right Navigation arrow */}
				<button className='next-btn' disabled={page === lastPage ? true : false} onClick={nextPage}>
					next
				</button>
			</div>
		</Wrapper>
	);
}

export default PageBtnContainerNew;
