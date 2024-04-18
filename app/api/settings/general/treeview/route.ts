"use server";

import { NextRequest, NextResponse} from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(request : any) {

    const allTreeview= await prisma.tTreeview.findMany({
        where: { parentId: null },
        orderBy: {
          name: 'asc'
        },
        include: {
            children: {
              orderBy: {
                name: 'asc'
              },
              include: {
                children: {
                  orderBy: {
                    name: 'asc'
                  },
                  include: {
                    children: {
                      orderBy: {
                        name: 'asc'
                      },
                      include: {
                        children: {
                          orderBy: {
                            name: 'asc'
                          },
                          include: {
                            children: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
    });   
     return NextResponse.json(allTreeview);       

}