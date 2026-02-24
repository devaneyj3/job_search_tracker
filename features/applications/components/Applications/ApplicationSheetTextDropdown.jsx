import React from 'react'
import {
  SheetDescription
} from "@/features/shared/ui/sheet";
import styles from "@/styles/ApplicationSheetTextDropdown.module.scss";

export default function ApplicationSheetTextDropdown({ item, label, field, activeSection, toggleSection, index }) {
  return (
      <section
        className={styles.dropdown}
        id={label}
        aria-label={label}>

        <button
          onClick={() => toggleSection(label)}
          tabIndex={index}
          aria-expanded={activeSection ===label }
          type="submit">
          {label}
        </button>
        {item[field] && activeSection === label && (
          <SheetDescription className={styles.itemDescription}>
            <strong>{label}:</strong> {item[field]}
          </SheetDescription>
        )}
      </section>
      
  )
}
