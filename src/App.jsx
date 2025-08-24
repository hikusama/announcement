import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        {/*  */}
      </header>

      <main className='text-[#ffffffb6]'>
        <div id="content" className='relative'>
          <div className="lgu">
            <div className="logoG">
              <img src={logo} alt="" />
            </div>
            <ol>
              <li>SKYouth Announcement</li>
              <li className='ls'>Salaan</li>
            </ol>
          </div>
          <div className="bgsc">
            <div className="fp">
              <div className='wth'></div>
              <div className='bt4'>
                <div className="fw">
                  <h4><span>🎉Welcome</span> to the official announcement page for the youth of Barangay Salaan.</h4>
                  <button><i className="fas fa-angle-down"></i> See latest update</button>
                  <p>Stay updated with events, opportunities, and important notices from your SK Council.</p>
                </div>
              </div>
              <div className="backtr relative">
                <div className="lkd h-[10rem]">
                  <img src={logo} className='h-[10rem]' />
                  <h4 className='font-bold text-center !mt-[1rem]'>Updates for the Youths of salaan</h4>
                </div>
              </div>
            </div>
            {/* <div className="backtrRight"></div> */}
            <div className="sp">

            </div>
          </div>

        </div>
      </main>
    </>
  )
}

export default App
