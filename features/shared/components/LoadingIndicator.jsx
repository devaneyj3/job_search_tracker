import { ClipLoader } from "react-spinners";

function LoadingIndicator() {
	const override = {
		display: "block",
		margin: "0 auto",
		borderColor: "silver",
	};
	return (
		<div className="sweet-loading">
			<ClipLoader
				color="silver"
				size={55}
				aria-label="Loading Spinner"
				data-testid="loader"
				cssOverride={override}
			/>
		</div>
	);
}

export default LoadingIndicator;
