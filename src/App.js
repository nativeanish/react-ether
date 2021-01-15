import {useState, useEffect} from "react";
import {ethers} from "ethers";
import abi from "./utils/WavePortal.json";
function App() {
  const [isMeta, setMeta] = useState(false);
  const [wallet, setWallet] = useState("");
  const [text, setText] = useState("");
  const [obj, setobj] = useState([]); 
  const [waveN, setWaveN] = useState(0);
  const isWallet = async() => {
    const {ethereum} = window;
    if(!ethereum){
      setMeta(false);
    }else{
      setMeta(true);
      try{
        const wallet = await ethereum.request({method: "eth_accounts"});
        if(!(wallet.length > 0 && wallet[0])){
          setWallet("");
        }else{
          setWallet(wallet[0]);
          try {
            const providers = new ethers.providers.Web3Provider(ethereum);
            const signer = providers.getSigner();
            const Wave = new ethers.Contract("",abi.abi,signer);
            const wave = await Wave.getWave();
            const temp = [];
            wave.map((e) =>  temp.push({waver:e.waver, message: e.message, date: (new Date(e.timestamp * 1000).toString())}))
            setobj(temp);
            const tt = await Wave.getWaveNo();
            setWaveN(Number(tt));
          }catch(err){
            console.log(err);
          }
        }
      }catch(err){
        console.log(err);
      } 
    }
  }
  useEffect(() => {
    isWallet().then().catch(err => console.log(err));
  },[]);

  const connectWallet = async() => {
      const {ethereum} = window;
      if(!ethereum){
         setMeta(false);
         setWallet("");
      }else{
          try{
            const wallet = await ethereum.request({method: "eth_requestAccounts"});
            if(!(wallet.length > 0 && wallet[0])){
              setWallet(""); 
            }else{
              setWallet(wallet[0]); 
            } 
          }catch(err){
            console.log(err);
            setWallet("");
          }
      }
  }
  const edit = (e) => {
    setText(e.target.value);
  }
  
  const show = async() => {
    const {ethereum} = window;
    if(!ethereum){
      setMeta(false);
      setWallet("");
    }else{
      if(!(wallet && text)){
        console.log("Please enter a text or assoicates an account");
      }else{
        try{
          const providers = new ethers.providers.Web3Provider(ethereum);
          const signers = providers.getSigner();
          const Wave = new ethers.Contract("",abi.abi,signers);
          const txn = await Wave.WaveMe(text);
          console.log(`Minning at adding at ${txn.hash}`);
          await txn.wait();
          await isWallet();
        } catch(err) {
          console.log(err);
        }
      }
    }
  }
  return (
    <div>
    <h1>This is Anish Gupta building high voltage stuff</h1>
    {
      isMeta ? (
        <div>
        <h1>You have a Wallet Application</h1>
        {
          wallet ? (
            <div> 
              <h1>You have a wallet {wallet} </h1>
              <input type="text" onChange={edit} />
              <button onClick={show}>Wave</button>
              <h1>There are {waveN} number of waves</h1>
              {obj.map((e,u) => <h2 key={u}>There is a Wave by {e.waver} with a message <i>{e.message}</i> at {e.date}</h2>)} 
            </div> 
          )
            : <h1> Please connect to your wallet <button onClick={connectWallet}>Connect!</button> </h1>
        } 
        </div>
      ):
        <h1>Please Install a wallet application</h1>
    } 
    </div>
 );
}

export default App;
