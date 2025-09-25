"use server";
export const JobStatusAction = async (initialState, formData) => {
	const data = {
		status: formData.get("status"),
	};
	return data.status;
};
