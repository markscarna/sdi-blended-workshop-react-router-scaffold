import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import React from 'react';
import {StyledDiv, WalletDiv} from './CSS/Styles'
import { WalletDetails } from './WalletDetails';

export const WalletContext = React.createContext();

function App() { 

//sets initial state
const [data, setData] = useState([{
  name: "bi-fold wallet",
  price: 500,
  image: "/images/wallet-1.jpeg" 
}]);

//sets the details on each individual wallet
const [details, setDetails] = useState([{}]);

//deals with image state
const [image, setImage] = useState({
  src: "",
  frontImage: "",
  backImage: ""
});

const [wallet, setWallet] = useState([]);

let walletObj = {wallet, setWallet, image, setImage};

//loads data from api
useEffect(() => {
  let url = 'http://localhost:3001/'
  fetch(url)
  .then((res) => res.json())
  .then((data)=> setData(data.wallets))
}, []);

//makes list from data array call
const List = ({walletsArray}) => {
return (
          <StyledDiv>{walletsArray.map((wallet)=><Wallet wallet={wallet}/>)}</StyledDiv>
       )
}  
//return individual wallets   
const Wallet = ({wallet}) => {
 return (  
   <WalletDiv onClick={() => {
    setDetails(wallet)
    setImage({src: wallet.image})
    setWallet(wallet)}}>
              <Link to={`/${wallet.id}`}>
                <img src={wallet.image} alt={wallet.name} width="350px"/> 
              </Link>
                <p>{wallet.name} </p>
                <p>{`$${wallet.price}`}</p>
  </WalletDiv>          
        )
}

  return (
    <WalletContext.Provider value={walletObj}>
      <Router>
        <Routes>
          <Route path='/' element= {<List walletsArray={data}/>}/>
          <Route path='/:id' element= {<WalletDetails wallet={details}/>}/>
        </Routes>
      </Router>
    </WalletContext.Provider>
  );
}

export default App;
