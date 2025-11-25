import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { styles } from "@/styles/LoadingSpinner.module.scss";

function LoadingSpinner() {
	let [color] = useState("silver");

	const override = {
		display: "block",
		margin: "0 auto",
		borderColor: "silver",
	};
	return (
		<div className="sweet-loading">
			<ClipLoader
				color={color}
				size={55}
				aria-label="Loading Spinner"
				data-testid="loader"
				cssOverride={override}
			/>
		</div>
	);
}

export default LoadingSpinner;
