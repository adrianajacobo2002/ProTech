import { PropsWithChildren } from "react";
import NavBar from "@/layouts/SupportNavbar"

export default function SoporteLayout({children}: PropsWithChildren){
    return(
        <>
            <NavBar/>
            {children}
        </>
    )
}