import CardPanel from "@/components/CardPanel";
import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function venue(){
    const venues = getVenues()
    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select your venue</h1>
            <Suspense fallback={<p>loading...<LinearProgress/></p>}>
            <VenueCatalog venuesJson={venues}/>
            </Suspense>
            {/* <CardPanel/> */}
        </main>
    )
}