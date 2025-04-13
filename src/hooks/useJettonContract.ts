import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import {Mint, MintPublic, SampleJetton} from "../../build/SampleJetton/tact_SampleJetton";
import {JettonDefaultWallet} from "../../build/SampleJetton/tact_JettonDefaultWallet";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useJettonContract() {
    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()
    const [balance, setBalance] = useState<string | null>()

    const jettonContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;

        const contract = SampleJetton.fromAddress(Address.parse("EQC5fRty5qx9iHKhHFtZxlIub3xc0_AaZLCnHmmIHWQWMa1E"))

        return client.open(contract) as OpenedContract<SampleJetton>
    }, [client, wallet])

    const jettonWalletContract = useAsyncInitialize(async()=>{
        if(!jettonContract || !client) return;

        const jettonWalletAddress = await jettonContract.getGetWalletAddress(
            Address.parse(Address.parse(wallet!).toString())
        )

        return client.open(JettonDefaultWallet.fromAddress(jettonWalletAddress))
    }, [jettonContract, client])

    useEffect(()=>{
        async function getBalance() {
            if(!jettonWalletContract) return 
            setBalance(null)
            const balance = (await jettonWalletContract.getGetWalletData()).balance
            setBalance(fromNano(balance))
            await sleep(5000)
            getBalance()
        }

        getBalance()

    }, [jettonWalletContract])

    return {
        jettonWalletAddress: jettonWalletContract?.address.toString(),
        balance: balance,
        mint1: () => {
            const message: MintPublic = {
                $$type: "MintPublic",
                amount: toNano(1),
            }

            jettonContract?.send(sender, {
                value: 500000000n
            }, message)
        },
        mint10: () => {
            const message: MintPublic = {
                $$type: "MintPublic",
                amount: toNano(10)
            }

            jettonContract?.send(sender, {
                value: toNano("5")
            }, message)
        },
        mint100: () => {
            const message: MintPublic = {
                $$type: "MintPublic",
                amount: toNano(100)
            }

            jettonContract?.send(sender, {
                value: toNano("50")
            }, message)
        }
    }
}