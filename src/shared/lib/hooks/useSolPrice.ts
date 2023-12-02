import {useEffect, useState} from "react";
import axios from "axios";



export async function useSolPrice() {
    const [solPrice, setSolPrice] = useState<number | null>(null)



    return solPrice
}