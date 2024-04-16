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

export interface CountryViewProps {
    dataTreeview: TTreeview[];
    selectedCountry: TTreeview | null;
    onSelectCountry: (id: number) => void;
    isNewCountry: boolean;
    setIsNewCountry: (isNew: boolean) => void;
    actionSaveCountry: (event: React.FormEvent<HTMLFormElement>) => void;
  }