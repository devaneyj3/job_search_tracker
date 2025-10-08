"use client";
import React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import jobStatus from "@/lib/jobStatus";
import { useJob } from "@/context/jobContext";

export function JobStatusSelect({ jobId }) {
	const { updateJobStatus } = useJob();
	return (
		<Select onValueChange={(value) => updateJobStatus(jobId, value)}>
			<SelectTrigger className="w-[180px] font-bold">
				<SelectValue placeholder="Status" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{jobStatus.map((status) => {
						return (
							<SelectItem key={status} value={status}>
								{status}
							</SelectItem>
						);
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
