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
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import styles from "./DeleteItem.module.scss";
import { useJob } from "@/context/jobContext";
import { useConnection } from "@/context/connectionContext";

export default function DeleteItemButton({ id, type = "job", companyInfoId }) {
	const jobContext = useJob();
	const connectionContext = useConnection();
	const context = type === "job" ? jobContext : connectionContext;
	const { deleteJob, deleteConnection } = context;

	const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);

	const handleDelete = () => {
		if (type === "job") {
			deleteJob(id, companyInfoId);
		} else {
			deleteConnection(id);
		}
		setInvoiceDialogOpen(false);
	};

	const itemType = type === "job" ? "job" : "connection";

	return (
		<Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
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
