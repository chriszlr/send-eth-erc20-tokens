import React, {createContext, useContext, useState} from 'react'
import { AppState } from '../App'
import Hero from './Hero'


const Navbar = () => {

  const App = useContext(AppState)


  return (
    <div>
      <nav className='container mx-auto flex justify-between items-center p-7 bg-white bg-opacity-85 rounded-bl-xl rounded-br-xl'>
        <div className='text-4xl text-gray-700 font-sans font-bold'>Monfair.</div>

        {!App.connected ? (
          <div>
          <a onClick={App.connectWallet} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 px-6 rounded-full text-white cursor-pointer'>Connect</a>
        </div>
        ) : (
          <div className='flex items-center space-x-20 text-xl font-bold'>
                <a className='cursor-pointer' onClick={() => App.setroute("eth")}>ETH</a>
                <ac className='cursor-pointer' onClick={() => App.setroute("erc20")}>ERC20</ac>
        </div>
        )}
    </nav>
    </div>
  )
}

export default Navbar