"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/features/shared/ui/dialog";
import { Button } from "@/features/shared/ui/button";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useCompany } from "@/features/companies/context/companyContext";
import { useApplication } from "@/features/applications/context/applicationContext";
import { useConnection } from "@/features/connections/context/connectionContext";

export default function DeleteItemDialog({ id, type = "company" }) {
	const companyContext = useCompany();
	const applicationContext = useApplication();
	const connectionContext = useConnection();
	const { deleteCompany } = companyContext;
	const { deleteApplication } = applicationContext;
	const { deleteConnection } = connectionContext;

	const [open, setOpen] = useState(false);

	const handleDelete = () => {
		if (type === "connection") {
			deleteConnection(id);
		} else if (type === "application") {
			deleteApplication(id);
		} else {
			deleteCompany(id);
		}
		setOpen(false);
	};

	const itemType = type;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive">
					<Trash2 />
					Delete
				</Button>
			</DialogTrigger>
			<DialogContent className="overflow-y-scroll max-h-screen w-xl bg-white">
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete this{" "}
						{itemType}
						and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="submit" variant="destructive" onClick={handleDelete}>
							Delete {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
