import { TSupplier } from '@prisma/client'
import { create } from 'zustand'

export const supplierStore  = create((set) => ({
    supplier : {
        isSheetOpen : false,
        allSupplier : []
    },
    updateSupplier:(newSupplier : any) => set((state:any) => ({
        supplier: {...state.supplier,...newSupplier}
    }))
}))