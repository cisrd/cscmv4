"use server";

import { prisma, Prisma } from "@/lib/prisma";
import { treeviewSchema } from "./zod.treeview.schema";
import { revalidatePath } from "next/cache";

export const saveTreeviewName = async (
  treeviewName: any,
  levelNumber: number
) => {
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

  try {
    const createdTreeview = await prisma.tTreeview.create({
      data: {
        name: result.data.name,
        parentId: result.data.parentID,
        level: levelNumber,
        isFm: false,
        adresse: "",
        projectCode: "",
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
        errorMessage = `Duplicate entry for name and parent ID`;
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

  // try {
  //   const createdTreeview = await prisma.tTreeview.create({
  //     data: {
  //       name: result.data.name,
  //       parentId: result.data.parentID,
  //       level: levelNumber,
  //       isFm: false,
  //       adresse: "",
  //       projectCode: "",
  //       codeAnalytic: "",
  //     },
  //   });
  //   revalidatePath("/settings/general/treeview");
  //   return {
  //     error: null,
  //     data: createdTreeview,
  //   };
  // } catch (errorCatch: unknown) {
  //   let errorMessage = "Error please contact the support!";

  //   if (errorCatch instanceof Error) {
  //     errorMessage = `Database error: ${errorCatch.message}`;
  //   }

  //   return {
  //     error: errorMessage,
  //   };
  // }
};
