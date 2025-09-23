"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import styles from "./CreateApplicationMenuItem.module.scss";
import { Button } from "../ui/button";
import CreateApplication from "../CreateApplication/CreateApplication";
import { useState } from "react";

export default function CreateApplicationMenuItem() {
	const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
	return (
		<Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="primary" className={styles.btn}>
					Create Application
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full overflow-y-scroll max-h-screen bg-white">
				<DialogHeader>
					<DialogTitle className={styles.title}>
						Track your application
					</DialogTitle>
					<DialogDescription className={styles.subtitle}></DialogDescription>
					<CreateApplication setInvoiceDialogOpen={setInvoiceDialogOpen} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
