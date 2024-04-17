import { create } from 'zustand'


export const treeviewStore  = create((set) => ({
    treeviewZustand : {
        isSheetOpen : false,
        treeviewData: []
    },
    updateTreeview:(newTreeview : any) => set((state:any) => ({
        treeviewZustand: {...state.treeviewZustand,...newTreeview}
    }))
}))