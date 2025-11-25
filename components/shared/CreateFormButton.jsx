"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import styles from "@/styles/CreateForm.module.scss";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CreateFormButton({
	buttonText,
	dialogTitle,
	formComponent: FormComponent,
}) {
	const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
	return (
		<Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="primary" className={styles.btn}>
					{buttonText}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full overflow-y-scroll max-h-screen bg-white max-w-[700px]">
				<DialogHeader>
					<DialogTitle className={styles.title}>{dialogTitle}</DialogTitle>
					<DialogDescription className={styles.subtitle}></DialogDescription>
					<FormComponent setInvoiceDialogOpen={setInvoiceDialogOpen} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
