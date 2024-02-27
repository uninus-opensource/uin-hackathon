import { FC, ReactElement } from "react";
import clsx from "clsx";
import { RxDashboard } from "react-icons/rx";

type TCard = {
    title?:string
    iconColor? : string;
    total?:string | number;
}
export const Card:FC<TCard> = ({...props}):ReactElement=> {
const iconClassname = clsx("rounded-md p-1 w-12 h-12",{
    "bg-primary-200 text-primary-500":props.iconColor === "primary",
    "bg-success-200 text-success-500 ":props.iconColor === "success",
    "bg-warning-200 text-warning-500 ":props.iconColor === "warning",
    "bg-error-200 text-error-500 ":props.iconColor === "error",
    "bg-info-200 text-info-500 ":props.iconColor === "info",
})

return (
<section className="bg-white shadow rounded-lg w-[240px] h-[84px] px-5 py-4">
    <div className="flex items-center gap-x-6">
        <span className={iconClassname}>
        <RxDashboard size={40}/>
        </span>
        <div className="flex flex-col gap-y-1 justify-center">
            <p className="text-xs text-grey-800">{props.title}</p>
            <p className="font-bold text-xl">{props.total}</p>
        </div>
    </div>
</section>
)
}