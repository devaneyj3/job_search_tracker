import React from "react";
import styles from "@/styles/JobOutreachTemplate.module.scss";
import Link from "next/link";

export default function JobOtreachTemplate({ contactName, companyName }) {
  return (
    <div className={styles.container}>
      <p className={styles.paragraph}>Hi {contactName},</p>
      <p>
        I wanted to read out to inquire about any job openings you have at{" "}
        {companyName}. I&#39;m a software engineer, but I tend to focus more on
        the business results than just the code itself.
      </p>
      <p className={styles.paragraph}>
        In my recent work at AG USA, I tried to make sure every technical change
        had a clear payoff. A few examples:
      </p>
      <ul className={styles.list}>
        <li>
          The Bottom Line: I moved a legacy e-commerce setup over to Shopify,
          which brought in $5,900 in its first month.
        </li>
        <li>
          User Experience: I re-architected a frontend that was sluggish,
          bringing the desktop Lighthouse score from 51 up to a perfect 100.
        </li>
        <li>
          Saving Time: I built a tonnage reporting app using Next.js and Prisma
          that cut the time spent on administrative tasks.
        </li>
      </ul>
      <p className={styles.paragraph}>
        I&#39;m early in my formal career, but I&#39;ve got plenty of "real
        world" grit. I actually worked as a janitor to put myself through my
        Software Engineering degree at WGU. I&#39;m looking for a team where I
        can take ownership and solve actual problems, not just move tickets.
      </p>
      <p className={styles.paragraph}>
        If you think my background could be a fit for {companyName} now or down
        the road, I&#39;d love to grab ten minutes to introduce myself.
      </p>
      <p className={styles.signature}>Jordan Devaney</p>
      <p className={styles.signature}>
        <Link href="https://www.linkedin.com/in/jordandevaney/" target="_blank">LinkedIn</Link>
        </p>
    </div>
  );
}
