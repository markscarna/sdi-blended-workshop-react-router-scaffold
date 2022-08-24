import React, {useContext} from "react";
import { DetailsDiv } from "./CSS/Styles";
import { ThumbDiv } from "./CSS/Styles";
import { WalletContext } from "./App";


export const WalletDetails = () => {
    const {wallet, image, setImage} = useContext(WalletContext);
    return (
        <DetailsDiv>
            <div>
                <h2>{wallet.name}</h2>
                <h3>{`$${wallet.price}`}</h3>
                <h4>{wallet.info.map((wallet)=><li>{wallet}</li>)}</h4>
            </div> 
            <div>
              <img src={`${image.src}`} alt={wallet.name} width="400px" />
            </div>
            <ThumbDiv>
              <img style={{border: `${image.frontImage}`}} onClick={()=>setImage({src: wallet.image, frontImage: "solid 3px black", backImage: ""})} src={wallet.image}  alt={wallet.name} width="200px" />
              <img style={{border: `${image.backImage}`}} onClick={()=>setImage({src: wallet.back, backImage: "solid 3px black", frontImage: ""})}src={wallet.back} alt={wallet.name} width="200px" />
            </ThumbDiv>
        </DetailsDiv>
    )}