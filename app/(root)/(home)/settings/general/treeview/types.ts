export interface TTreeview {
    id: number;
    name: string;
    parentId: number | null;
    isFm: boolean;
    level: number | null;
    adresse: string | null;
    projectCode: string | null;
    codeAnalytic: string | null;
    createdBy: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    updatedBy: string | null;
    children?: TTreeview[];
    parent?: TTreeview;
  }
 export  interface IState {
    dataTreeview: TTreeview[];
    selectedCountry: TTreeview | null;
    // selectedProject: TTreeview | null;
    // selectedSite: TTreeview | null;
    // selectedSubstore: TTreeview | null;
    // selectedStorage: TTreeview | null;
    // selectedProductionCenter: TTreeview | null;
  }
  
 export const initialState: IState = {
    dataTreeview: [],
    selectedCountry: null,
    // selectedProject: null,
    // selectedSite: null,
    // selectedSubstore: null,
    // selectedStorage: null,
    // selectedProductionCenter: null,
  };