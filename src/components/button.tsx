import { cva } from "class-variance-authority";

export const Button = cva( {
varients: {
    varient: {
        agree: "bg-green-500 text-white flex items-center justify-center rounded-md px-4 py-2",
        disagree: "bg-red-500 text-white flex items-center justify-center rounded-md px-4 py-2",
        chart_time:"bg-white text-black flex items-center justify-center rounded-md px-4 py-2 border border-black",
    },

    size: {
        large: {},
        medium: {},
        small: {}
    },
    
    hover: {
        agree: "hover:bg-green-300",
        disagree: "hover:bg-red-300",
        chart_time: "hover:bg-gray-300",
    }
}
});