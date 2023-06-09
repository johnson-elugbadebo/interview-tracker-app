import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';

function PageBtnContainer() {
	const { numOfPages, page, changePage } = useAppContext();

	const pages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1;
	});
	// console.log(pages);

	const prevPage = function () {
		let newPage = page - 1;
		if (newPage < 1) {
			// set newPage to last Page
			newPage = numOfPages;
		}
		changePage(newPage);
	};

	const nextPage = function () {
		let newPage = page + 1;
		if (newPage > numOfPages) {
			// set newPage to first Page
			newPage = 1;
		}
		changePage(newPage);
	};
	return (
		<Wrapper>
			<button className='prev-btn' onClick={prevPage}>
				pre
			</button>

			<div className='btn-container'>
				{pages.map((pageNumber) => {
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

			<button className='next-btn' onClick={nextPage}>
				next
			</button>
		</Wrapper>
	);
}
export default PageBtnContainer;
