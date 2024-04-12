"use server";

import { prisma } from "@/lib/prisma";
import { supplierSchema } from "./zod.schema";
import { revalidatePath } from "next/cache";

export const getAllSupplier = async (query:string) => {
    const countries = await prisma.tCountry.findMany({
        orderBy : {
            name : "desc"
        }
    });
    return countries;
    try {
        console.log("List all data");
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

export const getLastSupplierCode = async () => {
    const lastTsupplier = await prisma.tSupplier.findFirst({
        orderBy: { id: 'desc' } 
    });

    if (lastTsupplier) {
        const lastCode = lastTsupplier.code;
        if (lastCode) {
            const lastNumber = parseInt(lastCode.substring(1)); // Extract the numeric part of the code
            const nextNumber = lastNumber + 1;
            const nextCode = lastCode.substring(0, 1) + nextNumber.toString().padStart(lastCode.length - 1, '0');
            return nextCode;
        } else {
            return "0001";
        }
    } else {
        return "0001";
    }
}

export const saveSupplier  = async (newSupplier : unknown) => {

    const result = supplierSchema.safeParse(newSupplier);
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
        const createdSupplier = await prisma.tSupplier.create({
          data: {
            code: result.data.code,
            status: result.data.status,
            statusCash: result.data.statusIsCashPurchase,
            startDate: result.data.startDate,
            endDate: result.data.endDate,
            name: result.data.name,
            email: result.data.email,
            address: result.data.address,
            comment: result.data.comment,
            phone: result.data.phone,
            countryId: Number(result.data.country),
          },
        });
        revalidatePath("/settings/supplier/supplier-list");
        return {
            error : null
          };
      } catch (errorCatch) {
        return {
            error : "Error please contact the support!"
          };
      }

};
