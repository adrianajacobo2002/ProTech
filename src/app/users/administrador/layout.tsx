import { PropsWithChildren } from "react";
import NavBar from "@/layouts/AdminNavbar"

export default function AdministradorLayout({children}: PropsWithChildren){
    return(
        <>
            <NavBar/>
            {children}
        </>
    )
}