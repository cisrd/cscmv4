import { columnInterface } from "./interface";

const columns: Array<columnInterface> = [
    {
        title: "Sub-Family",
        field: "subfamily",
        show: true,
        width: 150,
        filter: "text",
    },
    {
        title: "Reference Period Average Price",
        field: "reference_price",
        show: true,
        width: 100,
        filter: "numeric",
    },
    {
        title: "M-2",
        field: "avgprice_m2",
        show: true,
        width: 80,
        filter: "numeric",
    },
    {
        title: "M-1",
        field: "avgprice_m1",
        show: true,
        width: 80,
        filter: "numeric",
    },
    {
        title: "M",
        field: "avgprice_m",
        show: true,
        width: 80,
        filter: "numeric",
    },
    {
        title: "M-2",
        field: "percentage2",
        show: true,
        width: 80,
        filter: "numeric",
    },
    {
        title: "M-1",
        field: "percentage1",
        show: true,
        width: 80,
        filter: "numeric",
    },
    {
        title: "M",
        field: "percentage",
        show: true,
        width: 80,
        filter: "numeric",
    },

];

export default columns;