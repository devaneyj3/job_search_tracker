const initialEmail = (company, firstName) => {
  const subject = `Software engineer interested in ${company}`;
  const body = `Hi ${firstName},

I'm a software engineer looking for my next role and wanted to ask if ${company} is hiring on the engineering side.

At my current role with AG USA as a software engineer I focus on creating applications that drive profit. Recent examples:

- Migrated a legacy store to Shopify ($5,900 in the first month)
- Rebuilt two websites that have brought in about $11k over the past few months
- Built a Python/Pandas reporting tool that cut admin work roughly in half

I love learning about new strategies for driving profit by taking online courses about related software engineering topics. I have shown determination by working as a janitor as I completed my Software Engineering degree at Western Governors University.

If there might be a fit at ${company}, I'd appreciate ten minutes to introduce myself.

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

  return { subject, body };
};

export default initialEmail;
