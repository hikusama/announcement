import { useEffect, useRef, useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

function App() {
  const fpRef = useRef(null);
  const spRef = useRef(null);

  useEffect(() => {
    const sections = [fpRef.current, spRef.current];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          } else {
            entry.target.classList.remove("animate-fade-in");
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => sec && observer.observe(sec));

    return () => {
      sections.forEach((sec) => sec && observer.unobserve(sec));
    };
  }, []);
  const goToNext = () => {
    spRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header>
        {/*  */}
      </header>

      <main className='text-[#ffffffb6]'>
        <div id="content" className='relative'>
          <div className="bgsc overflow-y-scroll snap-y snap-mandatory">
            <div ref={fpRef} className="fp snap-start opacity-0 transition-all duration-700">
              <div className="lgu">
                <div className="logoG">
                  <img src={logo} alt="" />
                </div>
                <ol>
                  <li>SKYouth Announcement</li>
                  <li className='ls'>Salaan</li>
                </ol>
              </div>
              <div className='wth'></div>
              <div className='bt4 flex flex-col items-start justify-center'>
                <div className="fw h-fit !pb-[6rem]">
                  <h4><span>🎉Welcome</span> to the official announcement page for the youth of Barangay Salaan.</h4>
                  <button onClick={goToNext} className='cursor-pointer  flex items-center gap-[.5rem] !py-[.4rem] !px-[1rem] rounded-[1rem]'>
                    <p>See latest update</p>
                    <div className='h-[1.7rem] w-[1.7rem] rounded-full flex flex-col justify-center'>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </button>
                  <p className='pmmm !mt-[2rem] text-[#c0c0c0d8]'>Stay updated with events, opportunities, and important notices from your SK Council.</p>
                </div>
              </div>

              <div className="backtr relative">
                <div className="lkd h-[10rem]">
                  <img src={logo} className='h-[10rem]' />
                  <h4 className='font-bold text-center !mt-[1rem]'>Updates for the Youths of salaan</h4>
                </div>
              </div>
            </div>
            <div className="bt4new">
              <h4><span>🎉Welcome</span> to the official announcement page for the youth of Barangay Salaan.</h4>
              <button onClick={goToNext} className='cursor-pointer  flex items-center gap-[.5rem] !py-[.4rem] !px-[1rem] rounded-[1rem]'>
                <p>See latest update</p>
                <div className='h-[1.7rem] w-[1.7rem] rounded-full flex flex-col justify-center'>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </button>
              <div className='w-full flex justify-center'>
                <p className='pmmm !mt-[2rem] text-[#c0c0c0d8]'>Stay updated with events, opportunities, and important notices from your SK Council.</p>
              </div>

            </div>
            {/* <div className="backtrRight"></div> */}
            <div ref={spRef} className="sp snap-start opacity-0 transition-all duration-700">
              <h4>Announcement🎉</h4>
              <div className="border-1 border-amber-100">
                <div className="overflow-x-scroll"></div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}

export default App
