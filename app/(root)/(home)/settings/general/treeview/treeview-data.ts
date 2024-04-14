export interface ICoountry {
    name: string;
    parentId?: number;
    selected?: boolean;
    project?: IProject[];
  }
  
export  interface IProject {
    name: string;
  }
  
export const itemsCountry: ICoountry[] = [
    {
      name : "Kazakhstan",
      selected : false,
      project : [
        {
          name : "Katko"
        },        {
          name : "Aktogay"
        },        {
          name : "Bozshakol"
        },
      ],
    },
  {
    name : "Russia",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Mauritania",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Algeria",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Chad",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Malia",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Burkina Faso",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Niger",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Ivory Coast",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Brazil",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Mozambique",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Gabon",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  },
  {
    name : "Congo",
    selected : false,
    project : [
      {
        name : "Site 1"
      }
    ]
  }
  ]