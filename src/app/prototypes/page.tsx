import type { Metadata } from "next";
import { PrototypeLabBrowser } from "@/components/prototypes/PrototypeLabBrowser";

export const metadata:Metadata={title:"Interactive Prototypes",description:"Runnable product experiments designed and built by Sharan Kuniyil Shaji."};
export default function PrototypesPage(){return <PrototypeLabBrowser/>}
