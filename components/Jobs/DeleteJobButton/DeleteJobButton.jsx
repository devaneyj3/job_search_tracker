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
import styles from "./DeleteJob.module.scss";
import { useJob } from "@/context/jobContext";

export default function DeleteJobButton({ id, company }) {
	const { deleteJob } = useJob();
	const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
	return (
		<Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive">
					<Trash2 />
					Delete Application
				</Button>
			</DialogTrigger>
			<DialogContent className="overflow-y-scroll max-h-screen w-xl bg-white">
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							type="submit"
							variant="destructive"
							onClick={() => deleteJob(id, company)}>
							Delete Job
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
