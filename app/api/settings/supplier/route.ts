"use server";

import { NextRequest, NextResponse} from 'next/server';
import { prisma } from "@/lib/prisma";
import { clerkClient } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server';
import { supplierStore } from '@/store/supplier';

export async function GET(request : any) {

    const allSuppliers = await prisma.tSupplier.findMany({
        orderBy : {
            name : "asc"
        }
    });   

    const allCountries = await prisma.tCountry.findMany({
        orderBy : {
            name : "desc"
        }
    });   

    const dataResult = {
        "supplier": allSuppliers, "country" : allCountries
    }

     return NextResponse.json(dataResult);       

}