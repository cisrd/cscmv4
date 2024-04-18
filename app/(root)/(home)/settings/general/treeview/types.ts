export interface TTreeview {
  id: number;
  name: string;
  parentId: number | null;
  isFm: boolean;
  level: number | null;
  adresse: string | null;
  code: string | null;
  codeAnalytic: string | null;
  createdBy: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  updatedBy: string | null;
  children?: TTreeview[];
  parent?: TTreeview;
  companyName: string | null;
  email: string | null;
  phone: string | null;
  isActivated: boolean;
  isRemoved: boolean;
  isSalesCenter: boolean;
  isTender: boolean;
  isMenuEnginnering: boolean;
  poFooter: string | null;
  poEmailBody: string | null;
  poCcEmail: string | null;
}
export interface IState {
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
