"use server";

import { prisma, Prisma } from "@/lib/prisma";
import { treeviewSchema } from "./zod.treeview.schema";
import { revalidatePath } from "next/cache";
import { TTreeview } from "./types";

function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const saveTreeviewName = async (
  treeviewName: any,
  levelNumber: number
) => {
  const result = treeviewSchema.safeParse(treeviewName);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage +=
        capitalizeFirstLetter(String(issue.path[0])) +
        " : " +
        issue.message +
        "\n";
    });
    return {
      error: errorMessage,
    };
  }

  try {
    const createdTreeview = await prisma.tTreeview.create({
      data: {
        name: result.data.name,
        parentId: result.data.parentID,
        level: levelNumber,
        isFm: false,
        address: "",
        code: "",
        codeAnalytic: "",
      },
    });
    revalidatePath("/settings/general/treeview");
    return {
      error: null,
      data: createdTreeview,
    };
  } catch (errorCatch: unknown) {
    let errorMessage = "Error please contact the support!";

    if (errorCatch instanceof Prisma.PrismaClientKnownRequestError) {
      if (errorCatch.code === "P2002") {
        errorMessage = `This NAME is already in the database!`;
      } else {
        errorMessage = `Database error: ${errorCatch.message}`;
      }
    } else if (errorCatch instanceof Error) {
      errorMessage = `Unexpected error: ${errorCatch.message}`;
    }

    return {
      error: errorMessage,
    };
  }
};

export async function updateTreeviewAction (treeviewName: any) {
  const result = treeviewSchema.safeParse(treeviewName);
  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage =
        errorMessage + issue.path[0] + " : " + issue.message + "\n";
    });

    return {
      error: errorMessage,
    };
  }

  const { data } = result;
  const updateData = {
    ...data,
  };

  try {
    const createdTreeviewRes = await prisma.tTreeview.update({
      where: {
        id: treeviewName.id,
      },
      data: updateData,
    });
    revalidatePath("/settings/general/treeview");
    return {
      error: null,
      data: createdTreeviewRes,
    };
  } catch (errorCatch) {
    return {
      error: "Error please contact the support!",
    };
  }
};
