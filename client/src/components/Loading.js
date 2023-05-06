// This component stays local, don't import to index.js
// Center prop places it in center of page

function Loading({ center }) {
	return <div className={center ? 'loading loading-center' : 'loading'}></div>;
}

export default Loading;
