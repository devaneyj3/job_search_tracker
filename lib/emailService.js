import prisma from "@/features/shared/lib/prisma";
export async function getEmailsByConnectionId(connectionId) {
  if (!connectionId) {
    throw new Error("User ID is required");
  }

  try {
    const emails = await prisma.email.findMany({
      where: { connectionId },
      orderBy: { createdAt: "desc" },
    });

    return emails;
  } catch (error) {
    console.error("Error fetching emails by emailId:", error);
    throw new Error(`Failed to fetch emails: ${error.message}`);
  }
}

export async function createNewEmail({
  emailId,
  subject,
  body,
  sequence,
  sent
}) {
  if (!emailId) {
    throw new Error("Connection ID is required");
  }
  if (!subject) {
    throw new Error("Subject is required");
  }
  if (!body) {
    throw new Error("Body is required");
  }
  if (!sequence) {
    throw new Error("Sequence is required");
  }
  if (!sent) {
    throw new Error("Sent date is required");
  }


  try {
    const email = await prisma.email.create({
      data: {
        emailId,
        subject,
        body,
        sequence,
        sent
      },
    });

    return email;
  } catch (error) {
    console.error("Error creating email:", error);

    if (error.code === "P2002") {
      const target = error.meta?.target || [];
      if (target.includes("id") || target.length === 0) {
        throw new Error("Database sequence error. Please reset the database sequence.");
      }
      throw new Error(`A email with this ${target.join(", ")} already exists`);
    }
    if (error.code === "P2003") {
      throw new Error("Invalid user ID or foreign key constraint failed");
    }

    throw error;
  }
}

export async function deleteEmail(emailId) {
  if (!emailId) {
    throw new Error("Email ID is required");
  }

  try {
    const deletedEmail = await prisma.email.delete({
      where: {
        id: emailId,
      },
    });

    return deletedEmail;
  } catch (error) {
    console.error("Error deleting email:", error);

    if (error.code === "P2025") {
      throw new Error("Email not found");
    }

    throw new Error(`Failed to delete email: ${error.message}`);
  }
}


export async function updateEmail(emailId, data) {
  if (!emailId) {
    throw new Error("Email ID is required");
  }

  try {
    const updatedEmail = await prisma.email.update({
      where: {
        id: emailId,
      },
      data: {
        ...data,
      },
    });
    return updatedEmail;
  } catch (error) {
    console.error("Error updating email:", error);

    if (error.code === "P2025") {
      throw new Error("Email not found");
    }

    throw new Error(`Failed to update email: ${error.message}`);
  }
}
