import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import React from 'react';
import styled from 'styled-components'


function App() { 

const [data, setData] = useState([{
  name: "bi-fold wallet",
  price: 500,
  image: "/images/wallet-1.jpeg" 
}]);

const [details, setDetails] = useState([{}]);

const [image, setImage] = useState({
  src: "",
  frontImage: "",
  backImage: ""
});

const List = ({walletsArray}) => {
return (
          <StyledDiv>{walletsArray.map((wallet)=><Wallet wallet={wallet}/>)}</StyledDiv>
       )
}  

 const StyledDiv = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: center;
 align-items: center;
 gap: 10px;
 gap: 10px 20px;
 row-gap: 0px;
 column-gap: 74px;
 text-transform: capitalize;
 text-align: center;
 `;
  
const Wallet = ({wallet}) => {
 return (
  
   <WalletDiv onClick={() => {
    setDetails(wallet)
    setImage({src: wallet.image})}}>
              <Link to={`/${wallet.id}`}>
                <img src={wallet.image} alt={wallet.name} width="350px"/> 
              </Link>
                <p>{wallet.name} </p>
                <p>{`$${wallet.price}`}</p>
  </WalletDiv>
          
        )

}

const WalletDiv = styled.div`
width: 450px;
height: 450px; 
margin: auto; 
padding-top: 60px; 
padding-bottom: 60px:
`;


const WalletDetails = ({wallet}) => {
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
          {/* <img style={{border:"solid 1px red"}}></img> */}
          <img style={{border: `${image.frontImage}`}} onClick={()=>setImage({src: wallet.image, frontImage: "solid 3px black"})} src={wallet.image}  alt={wallet.name} width="200px" />
          <img style={{border: `${image.backImage}`}} onClick={()=>setImage({src: wallet.back, backImage: "solid 3px black"})}src={wallet.back} alt={wallet.name} width="200px" />
        </ThumbDiv>
    </DetailsDiv>
)}

const DetailsDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
column-gap: 20px;
min-height: 100vh;
align-items: center;
text-transform: capitalize;
font-size: x-large;
text-transform: uppercase;
`;

const ThumbDiv = styled.div`
display: flex;
flex-direction: column
`;


useEffect(() => {
  let url = 'http://localhost:3001/'
  fetch(url)
  .then((res) => res.json())
  .then((data)=> setData(data.wallets))
}, []);


  return (
    <Router>
    <Routes>
      <Route path='/' element= {<List walletsArray={data}/>}/>
      <Route path='/:id' element= {<WalletDetails wallet={details}/>}/>
    </Routes>
  </Router>
  );
}

export default App;
