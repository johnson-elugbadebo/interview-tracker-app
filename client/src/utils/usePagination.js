import { useMemo } from 'react';
import { useAppContext } from '../context/appContext';

const DOTS = '...';

function usePagination({ siblingCount = 1 }) {
	const { numOfPages, page } = useAppContext();

	const paginationRange = useMemo(() => {
		// We use the useMemo hook to compute our core login
		// useMemo callback will run when any value in its dependency array changes

		// 1. Calculating the total pages
		// const totalPageCount = Math.ceil(totalCount / pageSize);
		// const totalCount = jobs.length;
		// 2. Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
		const totalPageNumbers = siblingCount + 5;
		// 3. implement custom range function
		const range = function (start, end) {
			let length = end - start + 1;
			/* Create an array of certain length and set the elements within it from start value to end value. */
			return Array.from({ length }, (_, index) => index + start);
		};

		// Case 1: If the number of pages is less than the page numbers we want to show in our pagination Component, we return the range [1..totalPageCount]
		if (totalPageNumbers >= numOfPages) {
			return range(1, numOfPages);
		}

		//	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
		const leftSiblingIndex = Math.max(page - siblingCount, 1);
		const rightSiblingIndex = Math.min(page + siblingCount, numOfPages);
		// We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < numOfPages - 2;
		const firstPageIndex = 1;
		const lastPageIndex = numOfPages;

		// Case 2: No left DOTS to show, but rights DOTS to be shown
		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount;
			let leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, numOfPages];
		}

		// Case 3: No right DOTS to show, but left DOTS to be shown
		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount;
			let rightRange = range(numOfPages - rightItemCount + 1, numOfPages);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		// Case 4: Both left and right DOTS to be shown
		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [numOfPages, siblingCount, page]);

	return paginationRange;
}

export { usePagination, DOTS };
