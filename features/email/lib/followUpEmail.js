import { readableDate } from "@/features/shared/lib/utils"

const followUpEmail = (company, firstName, firstEmailDate) => {

  const subject = `Follow up email from ${readableDate(firstEmailDate)}`;

  const body = `Hi ${firstName},
  
  I wanted to follow up regarding my last email on ${readableDate(firstEmailDate)}. I realize you are busy and appreciate you looking at my emails.
  
  In addition to the accomplishments highlighted in my previous email, I have taken the initiative to independently design, develop, and launch multiple revenue-generating websites for the company. These projects have directly supported business growth, demonstrating both technical expertise and a strong sense of ownership in delivering results that impact the bottom line.

  These websites have generated over $11,000 for a small business based out of Georgia for the past few months.

  If you think my background could be a fit for ${company} now or down the road, I'd love to grab ten minutes to introduce myself.
  
  Jordan Devaney
  https://www.linkedin.com/in/jordandevaney/`;

  return { subject, body };
}

export default followUpEmail