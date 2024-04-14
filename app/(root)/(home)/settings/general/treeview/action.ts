"use server";

import { prisma } from "@/lib/prisma";
import { treeviewSchema } from "./zod.treeview.schema";
import { revalidatePath } from "next/cache";

export const saveCountryName  = async (countryName : any) => {

    const result = treeviewSchema.safeParse(countryName);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + " : " + issue.message + "\n";
      });

      return {
        error : errorMessage
      };
    }

    try {
        const createdCountry = await prisma.tTreeview.create({
          data: {
            name: result.data.name,
            parentId : null,
            isFm: false,
            adresse: "",  // Defaulting to an empty string if not provided
            projectCode:  "",  // Defaulting to an empty string if not provided
            codeAnalytic: "",
          },
        });
        revalidatePath("/settings/general/treeview");
        return {
            error : null
          };
      } catch (errorCatch) {
        return {
            error : "Error please contact the support!"
          };
      }

};