import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PinCard({ novel }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate()

  return (
    <div 
        className={`relative group  mb-4 `}
        
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    >
      <div  onClick={()=>navigate(`/novel/${novel.id}/`)} className={`  md:max-w-50  cursor-pointer relative overflow-hidden rounded-2xl ${novel.is_premium && 'shadow-2xl shadow-cyan-950'}  bg-gray-900`}>
        <img
          src={novel.novel_image}
          alt={novel.name}
          className="aspect-[3/5]  lg:h-88 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* {isHovered && (
          <div className="absolute inset-0  bg-opacity-40 transition-opacity duration-300">
            <div className="absolute top-3 right-3">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  isSaved
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>

            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-all">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-all">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
                <a
                  href={novel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xs px-3 py-1.5 bg-black bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                >
                  {novel.domain}
                </a>
              </div>
            </div>
          </div>
        )} */}
      </div>

      <div className=" flex justify-between  mt-1 px-1">
        <h3 className="text-gray-400 text-[10px] font-bold line-clamp-2">{novel.name}</h3>
        
        
      
            
        <span className="text-white font-bold sm:text-xs text-[9px] ">{novel.author}</span>
        
          
        </div>
      </div>
    
  );
}

export default PinCard;
