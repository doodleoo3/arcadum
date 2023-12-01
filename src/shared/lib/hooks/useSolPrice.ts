import {useEffect, useState} from "react";
import axios from "axios";

interface ISolPriceRequest {
    solana: {
        usd: number
    }
}

export async function useSolPrice() {
    const [solPrice, setSolPrice] = useState<number | null>(null)

    const solPriceRequest = axios.get<ISolPriceRequest>("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")

    useEffect(() => {
        try {
            solPriceRequest.then(res => {
                setSolPrice(res.data.solana.usd)
                console.log(res.data.solana.usd)
            })
        } catch (e) {
            setSolPrice(null)
        }
    }, []);

    return solPrice
}