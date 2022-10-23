import { useState, createContext, useEffect } from "react";
import Main from "./components/Main";
import { ethers } from "ethers"

export const AppState = createContext();

function App() {

  const [connected, setconnected] = useState(false)
  const [currentAccount, setcurrentAccount] = useState("")

  // ROUTES
  const [route, setroute] = useState("eth")

  const provider = new ethers.providers.Web3Provider(window.ethereum)

    const connectWallet = async () => {
        if(window.ethereum){
          const accounts = await window.ethereum.request({method: "eth_accounts"});
          if(accounts.length){
            setcurrentAccount(accounts[0])
          }else{
            console.log("could not set account")
          }
          setconnected(true)
        }
      }
      
      const checkIfWalletConnected = async () => {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
    
        if(accounts.length){
          setcurrentAccount(accounts[0])
          console.log("current account on load: ", accounts[0])
        }else{
          console.log("could not set account on load")
        }
        setconnected(true)
      }

      useEffect(() => {
        checkIfWalletConnected()
      }, [])

  return (
    <AppState.Provider value={{provider, connected, setconnected, currentAccount, setcurrentAccount, connectWallet, route, setroute}}>
        <Main />
    </AppState.Provider>
  );
}

export default App;
