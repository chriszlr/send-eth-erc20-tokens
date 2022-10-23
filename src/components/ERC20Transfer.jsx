import React, { useContext } from 'react'
import { AppState } from '../App'
import { TransferStates } from './Hero'

const ERC20 = () => {

  const App = useContext(AppState)
  const tx = useContext(TransferStates)

  return (
    <div>
      {!App.connected ? (
        <div className='flex justify-center items-center py-12 mt-48'>
          <h2 className='text-3xl text-white font-semibold'>Please Install <a className='underline underline-offset-6' target={"_blank"} href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=de'>MetaMask</a> and connect your wallet to continue!</h2>
        </div>
      ) : (
      <div className='flex justify-center items-center py-12 mt-48 container'>
      <div className='flex flex-col items-start mx-auto'>
        <h1 className='text-white text-5xl font-bold max-w-md'>Send money with more <span className='underline underline-offset-7'>safety</span></h1>

        <a className='bg-white my-12 py-3 px-9 rounded-full hover:bg-gray-300 hover:cursor-pointer font-bold text-xl'>Get Started</a>
      </div>

      <div>
        <form>
          <div className="flex justify-center items-center my-4 text-white text-lg font-semibold">ERC20 Transfer</div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
            fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd" />
          </svg>
          <input className="pl-2 outline-none border-none bg-white" type="text" value={tx.erc20contractAddress} onChange={(e) => tx.seterc20contractAddress(e.target.value)} placeholder="Contract Address" />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
            fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd" />
          </svg>
          <input className="pl-2 outline-none border-none bg-white" type="text" value={tx.erc20recipient} onChange={(e) => tx.seterc20recipient(e.target.value)} placeholder="Recipient" />
          </div>
				<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/></svg>
					<input className="pl-2 outline-none border-none" type="text" value={tx.erc20amount} onChange={(e) => tx.seterc20amount(e.target.value)} placeholder="Amount" />
				</div>
        <div className='space-x-3'>
          <a onClick={tx.sendERC20} className='bg-white my-12 py-3 px-4 rounded-full hover:bg-gray-200 hover:cursor-pointer font-bold text-sm'>Send</a>

          {tx.etherscanLink ? (
            <a href={`https://goerli.etherscan.io/address/${tx.erc20recipient}`} target={"_blank"} className='text-white text-xs font-bold'>View Tx</a>
          ): ""}
        </div>
        </form>
      </div>
    </div>
      )}
    </div>
  )
}

export default ERC20