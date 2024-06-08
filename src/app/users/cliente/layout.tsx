import { PropsWithChildren } from "react";
import NavBar from "@/layouts/ClientNavbar"

export default function ClienteLayout({children}: PropsWithChildren){
    return(
        <>
            <NavBar/>
            {children}
        </>
    )
}