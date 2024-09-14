import React, { useState, useRef, useEffect } from 'react';
import { fetchMemeImages, Meme } from '../APIs/memeApi';
import html2canvas from 'html2canvas';

const MemeGenerator: React.FC = () => {
  const [memeImages, setMemeImages] = useState<Meme[]>([])
  const [base64MemeImage, setBase64MemeImage] = useState<string | null>(null)
  const [topText, setTopText] = useState<string>("")
  const [bottomText, setBottomText] = useState<string>("")
  const memeRef = useRef<HTMLDivElement>(null)

  // fetch image from api

  useEffect(() => {
    const getMemeImages = async () => {
      const memeImageList = await fetchMemeImages();
      setMemeImages(memeImageList)

      if (memeImageList[1]) {
        // fetch image as base64Img to make it downloadable
        const base64Image = await fetchImageAsBase64(memeImageList[1]?.url)
        setBase64MemeImage(base64Image)
      }
    }

    getMemeImages()
  }, [])

  const fetchImageAsBase64 = async (imageUrl: string): Promise<string> => {
    const response = await fetch(imageUrl);
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string)
      }
      reader.onerror = reject;
      reader.readAsDataURL(blob)
    })
  }

  const handleTopTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopText(e.target.value)
  }

  const handleBottomTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBottomText(e.target.value)
  }

  const handleNewMemeImage  = async () => {
    const randomMemeImages = memeImages[Math.floor(Math.random() * memeImages.length)]
    if (randomMemeImages) {
      const base64Image = await fetchImageAsBase64(randomMemeImages?.url)
      setBase64MemeImage(base64Image)
    }
  };

const handleDownloadMeme=async()=>{
const memeElement = memeRef.current;
if(memeElement){
  const canvas = await html2canvas(memeElement)
  const imageData=canvas.toDataURL("image/png")
  const link = document.createElement("a");
  link.href = imageData;
  link.download="meme.png"
  link.click()
}
}


  return <div className='h-screen flex flex-col justify-center items-center'>
    <header>
      <div className='bg-gradient-to-r from-blue-600 to-violet-600 center justify-between text-white px-5 py-5 w-80 sm:min-w-[400px] md:min-w-[500px] lg:min-w-[700px]'>
        <div className='center justify-between gap-5 text-xl'>
          <i className="fa-regular fa-face-grin-tears"></i>
          <div className=''> Meme Generator</div>
        </div>
        <div className='text-sm'>
          Fun Project
        </div>
      </div>
    </header>


  <main className="px-2 py-3 md:py-5 lg:py-8 flex flex-col justify-center bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 border-sky-300 border-2 border-t-0 rounded-b-lg w-80 sm:min-w-[400px] md:min-w-[500px] lg:min-w-[700px]">
      <div className="inputs flex md:justify-around flex-col md:flex-row gap-2">
        <div className="flex md:items-start flex-col md:justify-start items-center justify-start">
          <label htmlFor="top-text">Top text</label>
          <input
            onChange={handleTopTextChange}
            type="text"
            id="top-text"
            value={topText}
            className="focus:outline-none focus:ring-0 p-2 rounded border border-gray-300 md:w-44 lg:w-60"
            placeholder="Top text"
          />
        </div>
        <div className="flex md:items-start flex-col md:justify-start items-center justify-start">
          <label htmlFor="bottom-text">Bottom text</label>
          <input
            onChange={handleBottomTextChange}
            type="text"
            id="bottom-text"
            value={bottomText}
            className="focus:outline-none focus:ring-0 p-2 rounded border border-gray-300 md:w-44 lg:w-60"
            placeholder="Bottom text"
          />
        </div>
      </div>

      <div className="center justify-center w-full mt-8 lg:mt-12">
        <button
          onClick={handleNewMemeImage}
          title="click to get new image"
          className="bg-gradient-to-r from-blue-800 to-indigo-900 px-4 py-2 rounded-md text-white cursor-pointer center gap-2"
        >
          Get a new meme image <i className="fa-regular fa-image"></i>
        </button>
      </div>

      <div className="center justify-center mt-2 md:mt-5 w-full">
        <div
          ref={memeRef} // Reference to meme container
          className="center justify-center w-full overflow-hidden relative"
        >
          {base64MemeImage ? (
            <img src={base64MemeImage} alt="" className="md:h-80" />
          ) : (
            <div className="text-center text-gray-400 p-12">Loading ...</div>
          )}
          <div className="absolute top-1 bg-white/75 px-2 py-1">
            {topText ? topText : "Top Text here"}
          </div>
          <div className="absolute bottom-1 bg-white/75 px-2 py-1">
            {bottomText ? bottomText : "Bottom Text here"}
          </div>
        </div>
      </div>

      <div className="center justify-center w-full mt-4">
        <button
          onClick={handleDownloadMeme}
          className="bg-gradient-to-r from-green-600 to-green-800 px-4 py-2 rounded-md text-white cursor-pointer center gap-2"
        >
          Download Meme <i className="fa-solid fa-arrow-down"></i>
        </button>
      </div>
    </main>
  </div>;
};

export default MemeGenerator;

