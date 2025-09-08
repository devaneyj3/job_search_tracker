import React from "react";

export default function JobSheet() {
	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>{j.companyName}</SheetTitle>
				<SheetDescription>
					Make changes to your profile here. Click save when you&apos;re done.
				</SheetDescription>
			</SheetHeader>
			<div className="">
				<div className="">
					<Label htmlFor="sheet-demo-name">Name</Label>
					<Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
				</div>
				<div className="">
					<Label htmlFor="sheet-demo-username">Username</Label>
					<Input id="sheet-demo-username" defaultValue="@peduarte" />
				</div>
			</div>
			<SheetFooter>
				<Button type="submit">Save changes</Button>
				<SheetClose asChild>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Close
					</Button>
				</SheetClose>
			</SheetFooter>
		</SheetContent>
	);
}
