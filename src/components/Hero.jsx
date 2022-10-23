import React, {createContext, useContext, useState} from 'react'
import { AppState } from '../App'
import { ethers } from "ethers"
import ETHTransfer from './ETHTransfer'
import ERC20Transfer from './ERC20Transfer'
import { wait } from '@testing-library/user-event/dist/utils'

export const TransferStates = createContext()

const Hero = () => {

  // ETH TRANSFER
  const [recipient, setrecipient] = useState("")
  const [amount, setamount] = useState("")
  const [message, setmessage] = useState("")
  const [txHash, settxHash] = useState("")
  const [etherscanLink, setetherscanLink] = useState(false)
  const [ethLoading, setethLoading] = useState(false)

  // ERC20 TRANSFER
  const [erc20contractAddress, seterc20contractAddress] = useState("")
  const [erc20recipient, seterc20recipient] = useState("")
  const [erc20amount, seterc20amount] = useState("")
  const [erc20message, seterc20message] = useState("")
  const [erc20txHash, seterc20txHash] = useState("")
  const [erc20tetherscanLink, seterc20etherscanLink] = useState("")

  const App = useContext(AppState)


  const send = async () => {
    setethLoading(true)
    const params = {
      from: App.currentAccount,
      to: recipient,
      value: amount,
      data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
    }
    const tx = await window.ethereum.request({method: "eth_sendTransaction", params: [params]})
    
    const receipt = await wait(tx)
    setethLoading(false)

    setetherscanLink(true)
  }

  const abi = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
    "function symbol() external view returns (string memory)",
    "function name() external view returns (string memory)"
  ]


  const sendERC20 = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const Signer = new ethers.Wallet("595a62d1b6a3eead63efb23b34a917d7ab0a03cf98e3e118561f3f64e0aabc4b", provider)
    const tokenContract = new ethers.Contract(erc20contractAddress, abi, provider)

    const tokenSigner = tokenContract.connect(Signer)
    const tx = await tokenSigner.transfer(erc20recipient, erc20amount)
  }


  return (
    <div>
      <TransferStates.Provider value={{recipient, setrecipient, amount, setamount, message, setmessage, txHash, settxHash, etherscanLink, setetherscanLink, send, erc20contractAddress, seterc20contractAddress, erc20recipient, seterc20recipient, erc20amount, seterc20amount, erc20message, seterc20message, erc20txHash, seterc20txHash, erc20tetherscanLink, seterc20etherscanLink, sendERC20, ethLoading, setethLoading}}>
        {App.route === "eth" ? (
        <ETHTransfer />
        ) : (
        <ERC20Transfer />
        )}
      </TransferStates.Provider>
    </div>
  )
}

export default Hero