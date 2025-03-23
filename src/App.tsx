import "./App.css";
import { Jetton } from "./components/Jetton";
import { Jettonten } from "./components/Jettonten";
import { Jettonhund } from "./components/Jettonhund";
import styled from "styled-components";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import Slider from "react-slick";  // react-slick importu
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@twa-dev/sdk";
import { FlexBoxRow } from "./components/styled/styled";
import { useEffect, useState } from "react";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #000;
    color: var(--tg-theme-text-color);
  }
  min-height: 100vh;
`;

const AppContainer = styled.div`
  max-width: 90vw;
  margin-top: 10vh;
`;

function getRandomWallet() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
  // 1 ile 7 arasında rastgele karakter sayısı belirle
  const charCount = Math.floor(Math.random() * 7) + 1;
  
  // Eğer 1 seçildiyse sadece "U" ile başlasın
  let wallet = charCount === 1 ? "U" : "UQ";
  
  // Belirlenen karakter sayısı kadar harf ekle (ilk 2 zaten UQ ise -2 çık)
  for (let i = 0; i < (charCount === 1 ? 0 : charCount - 2); i++) {
    wallet += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Çıktının sonuna 2 ile 4 arasında rastgele nokta ekle
  const dotCount = Math.floor(Math.random() * 3) + 2; // 2 ile 4 arasında rastgele sayı
  wallet += ".".repeat(dotCount);

  return wallet;
}

// Rastgele 1, 10 veya 100 seçme fonksiyonu
function getRandomTreeCount() {
  const options = [1, 10, 100];
  return options[Math.floor(Math.random() * options.length)];
}

// 14 ile 360 saniye arasında rastgele süre belirleme fonksiyonu
function getRandomTimeAgo() {
  const seconds = Math.floor(Math.random() * (1280 - 14 + 1)) + 14;
  return seconds > 60 ? `${Math.round(seconds / 60)}m ago` : `${seconds}s ago`;
}

function App() {
  const { network } = useTonConnect();
  const [wallet, setWallet] = useState(getRandomWallet());
  const [treeCount, setTreeCount] = useState(getRandomTreeCount());
  const [timeAgo, setTimeAgo] = useState(getRandomTimeAgo());

  // Her 4 saniyede bir verileri güncelleyen useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setWallet(getRandomWallet());
      setTreeCount(getRandomTreeCount());
      setTimeAgo(getRandomTimeAgo());
    }, 1000);

    return () => clearInterval(interval); // Component unmount olunca interval temizlenir
  }, []);

  // Slick slider ayarları
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <StyledApp className="mid">
      <AppContainer>
        <div className="headerdisplay">
          <span className="textoverpflow">
            <span className="headerwallet grey">{wallet}</span>
            <span className="green">&nbsp; just planted</span>
            <span>&nbsp; {treeCount <= 1 ? 1 + " Tree": treeCount + " Trees"}</span>
            <span className="green">&nbsp; to our future!</span>
          </span>
          <span className="grey">&nbsp; {timeAgo}</span>

        </div>

        <div className="card">
          <p>plant a tree</p>
          <p>you will get</p>
          <p className="green margin4vw">probably nothing</p>
        </div>

        {/* Slick Slider */}
        <Slider {...settings} className="single-item-slick">
          <Jetton />
          <Jettonten />
          <Jettonhund />
        </Slider>

        <p className="paragraph">
          If you found this bot, it may or may not affect your airdrop
        </p>

        <FlexBoxRow className="mid">
            <TonConnectButton/>
        </FlexBoxRow>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
