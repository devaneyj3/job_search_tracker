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

export function StatusSelect({ id, update, status }) {
	return (
		<Select onValueChange={(value) => update(id, value)}>
			<SelectTrigger className="w-[180px] font-bold">
				<SelectValue placeholder="Status" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{status.map((status) => {
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
