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

export function Jettonten() {
  const {connected, wallet} = useTonConnect()
  const {jettonWalletAddress, balance, mint10} = useJettonContract()

  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <p className="headersize gainsboro">Plant 10 Trees</p>
        <FlexBoxCol>
          <div className="between betweenmargin">
            <span className="youwillget">You will get</span>
            <span className="gainsboro youwillget2">10 Trees</span>
          </div>

        </FlexBoxCol>
        <Button
          disabled={!connected} onClick={mint10}>
          Plant your Trees
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
