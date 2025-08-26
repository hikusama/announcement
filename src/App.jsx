import { useEffect, useRef, useState } from 'react'
import logo from './assets/logo.png'
import './App.css'
import { supabase } from "./supabaseClient";

function App() {
  const fpRef = useRef(null);
  const spRef = useRef(null);
  const containerRef = useRef(null);
  const loadingRef = useRef(false) // lock for fetch
  const pageRef = useRef(1)       // current page tracker

  const [isLoad, setLoad] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [position, setPosition] = useState(1)
  const [data, setData] = useState([])

  useEffect(() => {
    const sections = [fpRef.current, spRef.current];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-in");
          else entry.target.classList.remove("animate-fade-in");
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach(sec => sec && observer.observe(sec));
    return () => sections.forEach(sec => sec && observer.unobserve(sec));
  }, []);

  const goToNext = () => spRef.current.scrollIntoView({ behavior: "smooth" });

  const scrollNext = () => {
    if (!containerRef.current) return;
    if (position === data.length + 1) return;
    setPosition(prev => prev + 1)
    const childWidth = containerRef.current.firstChild.offsetWidth;
    containerRef.current.scrollBy({ left: childWidth, behavior: "smooth" });
  }

  const scrollPrev = () => {
    if (!containerRef.current) return;
    if (position === 1) return;
    setPosition(prev => prev - 1)
    const childWidth = containerRef.current.firstChild.offsetWidth;
    containerRef.current.scrollBy({ left: -childWidth, behavior: "smooth" });
  }

  async function fetchAnnouncements(page = 1, pageSize = 1) {
    if (loadingRef.current) return { data: [], total: 0 };
    loadingRef.current = true;
    setLoad(true);

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    try {
      const { count: total } = await supabase
        .from("announcement")
        .select("*", { count: "exact", head: true });

      const { data: fetchedData, error } = await supabase
        .from("announcement")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return { data: fetchedData || [], total: total || 0 };
    } catch (err) {
      console.error(err);
      return { data: [], total: 0 };
    } finally {
      loadingRef.current = false;
      setLoad(false);
    }
  }

  const load = async (page = 1) => {
    const d = await fetchAnnouncements(page);
    setTotalRows(d.total);

    if (page > 1) setData(prev => [...prev, ...d.data]);
    else setData(d.data);
    setPosition(1)
    pageRef.current = page; // update page tracker
  }

  useEffect(() => { load(1); }, []);
  useEffect(() => { console.log(position) }, [position]);

  return (
    <>
      <header>{/*  */}</header>
      <main className='text-[#ffffffb6]'>
        <div id="content" className='relative'>
          <div className="bgsc overflow-y-scroll snap-y snap-mandatory">
            <div ref={fpRef} className="fp snap-start opacity-0 transition-all duration-700">
              <div className="lgu">
                <div className="logoG"><img src={logo} alt="" /></div>
                <ol><li>SKYouth Announcement</li><li className='ls'>Salaan</li></ol>
              </div>
              <div className='wth'></div>
              <div className='bt4 flex flex-col items-start justify-center'>
                <div className="fw h-fit !pb-[6rem]">
                  <h4><span>🎉Welcome</span> to the official announcement page for the youth of Barangay Salaan.</h4>
                  <button onClick={goToNext} className='cursor-pointer flex items-center gap-[.5rem] !py-[.4rem] !px-[1rem] rounded-[1rem]'>
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
              <button onClick={goToNext} className='cursor-pointer flex items-center gap-[.5rem] !py-[.4rem] !px-[1rem] rounded-[1rem]'>
                <p>See latest update</p>
                <div className='h-[1.7rem] w-[1.7rem] rounded-full flex flex-col justify-center'>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </button>
              <div className='w-full flex justify-center'>
                <p className='pmmm !mt-[2rem] text-[#c0c0c0d8]'>Stay updated with events, opportunities, and important notices from your SK Council.</p>
              </div>
            </div>

            <div ref={spRef} className="sp snap-start opacity-0 transition-all duration-700 grid grid-rows-[auto_minmax(0,1fr)]">
              <h4 className='font-bold text-[1.5rem] !p-[4rem_0_7rem_0] w-full text-center'>Announcement🎉</h4>
              <div className="flex justify-center h-full items-start">
                <div className="relative w-fit">
                  <button onClick={scrollPrev} className='agile1'><i className="fas fa-angle-left"></i></button>
                  <div ref={containerRef} className="annn overflow-x-scroll flex ">
                    {isLoad ?
                      <div className="h-[15rem] w-full flex justify-center items-center">
                        <p className='text-center !mt-[1rem] text-[.9rem]'><i className="fas fa-spinner fa-spin"></i> Fetching data..</p>
                      </div> :
                      data.length === 0 ?
                        <div className="h-[15rem] w-full flex justify-center items-center">
                          <p className='text-center !mt-[1rem]'>No announcement.</p>
                        </div> :
                        data.map((card, ind) => (
                          <>
                            <ul key={card.id} className='relative'>
                              <div className="absolute left-[.5rem] top-[.5rem]">
                                <img src={logo} className='h-[2.5rem]' alt="" />
                              </div>
                              <li className='flex justify-end items-end flex-col'>
                                <p className='!text-[.9rem]'>
                                  {card.created_at ? new Date(card.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '------'}
                                </p>
                                <p className='!text-[.9rem]'>Posted</p>
                              </li>
                              <li className='!mt-[.7rem]'>
                                <p>What</p>
                                <p>{card.what}</p>
                              </li>
                              <li className='!mt-[.7rem]'>
                                <p>When</p>
                                <p>
                                  {
                                    (new Date(card.when).toLocaleString('en-US', {
                                      month: 'long',
                                      day: 'numeric',
                                      year: 'numeric',
                                      hour: 'numeric',
                                      minute: '2-digit',
                                      hour12: true
                                    }).replace(',', ''))
                                  }
                                </p>
                              </li>
                              <li className='!mt-[.7rem]'>
                                <p>Where</p>
                                <p>{card.where}</p>
                              </li>
                              <br />
                              <hr />
                              <li className='!py-[.5rem]'>
                                <p>Who</p>
                                <p>{card.who}</p>
                              </li>
                              <hr />
                              <li className='!py-[.5rem]'>
                                <p>Description</p>
                                <p>{card.description}</p>
                              </li>
                              <hr />

                            </ul>
                            {ind === data.length - 1 &&
                              (totalRows === data.length ? (
                                <ul className='lstt flex items-center justify-center'>
                                  <div>
                                    <div>All caught <i className="fas fa-thumbs-up"></i></div>
                                  </div>
                                </ul>
                              ) : (
                                <ul className='lstt flex items-center justify-center'>
                                  <div>
                                    <button className='!p-[.5rem_1.2rem]' onClick={() => load(pageRef.current + 1)}>Load more <i className="fas fa-arrow-right"></i></button>
                                  </div>
                                </ul>
                              ))
                            }
                          </>
                        ))
                    }
                  </div>

                  <div className="flex justify-center gap-2 !mt-4 ">
                    {data.map((_, i) => (
                      <span key={i} className={`w-2 h-2 ${position - 1 === i ? 'bg-[#bdbdbd]' : ''} border-1 border-[#ffffff48] rounded-full`}></span>
                    ))}
                    {data.length === 0 ? '' : <span className={`w-2 h-2 ${position === data.length + 1 ? 'bg-[#bdbdbd]' : ''} border-1 border-[#ffffff48] rounded-full`}></span>}
                  </div>
                  <button onClick={scrollNext} className='agile2'><i className="fas fa-angle-right"></i></button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
