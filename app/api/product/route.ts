import axios from 'axios';
import { NextRequest, NextResponse} from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';


export async function GET(request : any) {

    const url = 'http://10.102.29.32/CSCMV3_KZT_PROD_WEB/UK/Settings/Page-Rest-PRODUCT-Settings.awp?sType=list';

    const res = await axios.get(url, {
              headers: {
                'Content-Type': 'application/json',
              },
            }) 
     return NextResponse.json(res.data);       

}