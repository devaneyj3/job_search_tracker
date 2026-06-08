
const initialEmail = (company, firstName) => {

  const subject = `Interested in opportunities at ${company}`;

  const body = `Hi ${firstName},
  
  I wanted to reach out to inquire about any job openings you have at ${company}. I'm a software engineer, but I tend to focus more on the business results than just the code itself.
  
  In my recent work at AG USA, I tried to make sure every technical change had a clear payoff. A few examples:
  
  - The Bottom Line: I moved a legacy e-commerce setup over to Shopify, which brought in $5,900 in its first month.
  - User Experience: I re-architected a frontend that was sluggish, bringing the desktop Lighthouse score from 51 up to a perfect 100.
  - Saving Time: I built a tonnage reporting app using Next.js and Prisma that cut the time spent on administrative tasks.
  
  I'm early in my formal career, but I've got plenty of "real world" grit. I actually worked as a janitor to put myself through my Software Engineering degree at WGU. I'm looking for a team where I can take ownership and solve actual problems, not just move tickets.
  
  If you think my background could be a fit for ${company} now or down the road, I'd love to grab ten minutes to introduce myself.
  
  Jordan Devaney
  https://www.linkedin.com/in/jordandevaney/`;

  return { subject, body };
}

export default initialEmail