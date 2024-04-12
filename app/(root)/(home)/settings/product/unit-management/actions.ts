"use server"

import { revalidatePath } from 'next/cache';
import { setTimeout } from 'timers/promises';
import {z} from 'zod'


export const SaveData = async (formaData : FormData) => {

    //await new Promise((resolve) => setTimeout(resolve, 250));
    
 
    const schema = z.object({
       code:z.string().trim().min(2, "Code cannot be blank!"),
       name:z.string().trim().min(1, "Name cannot be blank!"),
    });

    const result = schema.safeParse({
        Code : formaData.get('code') ,
        Name: formaData.get('name'),
    });

    if (result.success) {
        revalidatePath("/settings/product/unit-management");
        return { success: true };
      } else {
        return { success: false, errors: result.error.issues };
      }
    
}