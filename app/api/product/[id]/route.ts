import axios from 'axios';
import { NextRequest, NextResponse} from 'next/server';

export async function GET(request : Request) {

    const id = request.url.slice(request.url.lastIndexOf('/')+1)

    const url = 'http://10.102.29.32/CSCMV3_KZT_PROD_WEB/UK/Settings/Page-Rest-PRODUCT-Settings.awp?sType=details&nIdItem=';

    const res = await axios.get(url + id, {
              headers: {
                'Content-Type': 'application/json',
              },
            }) 
     return NextResponse.json(res.data);       

}