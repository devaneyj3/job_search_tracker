import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import styles from "../AddJobForm.module.scss";

export default function CustomInput({form, formName, label, description, placeholder}) {
	return (
		<FormField  
			control={form.control}
      name={formName}
			render={({ field }) => (
				<FormItem className={styles.field}>
          <FormLabel className={styles.label}>{label}</FormLabel>
					<FormControl>
						<Input
							className={styles.input}
							placeholder={placeholder}
							{...field}
						/>
					</FormControl>
					<FormDescription className={styles.description}>
						{description}
					</FormDescription>
					<FormMessage className={styles.message} />
				</FormItem>
			)}
		/>
	);
}
