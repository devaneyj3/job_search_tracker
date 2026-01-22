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
import styles from "@/styles/DeleteItem.module.scss";
import { useCompany } from "@/features/companies/context/companyContext";

export default function DeleteItemDialog({ id, type = "company", companyInfoId }) {
	const companyContext = useCompany();
	const { deleteCompany } = companyContext;

	const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);

	const handleDelete = () => {
		deleteCompany(id);
		setInvoiceDialogOpen(false);
	};

	const itemType = "company";

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
