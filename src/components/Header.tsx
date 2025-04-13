import { Address } from "ton-core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";

export function Header() {
  const {connected, wallet} = useTonConnect()
  const {jettonWalletAddress, balance, mint1} = useJettonContract()

  return (
    <Card title="Header">
      <FlexBoxCol>
        <p className="headersize gainsboro">Plant 1 Tree</p>
        <FlexBoxCol>
          <div className="between betweenmargin">
            <span className="youwillget">You will get</span>
            <span className="gainsboro youwillget2">1 Tree</span>
          </div>

        </FlexBoxCol>
        <Button
          disabled={!connected} onClick={mint1}>
          Plant your Tree
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
