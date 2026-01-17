import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";


function NovelCard({ novel }) {
  const navigate = useNavigate()

  return (
    <div 
     className="bg-zinc-900 rounded-lg overflow-hidden hover:transform transition-all duration-300 shadow-lg hover:shadow-2xl border border-zinc-800 hover:border-zinc-700">
      {/* Novel Image */}
      <div className="relative">
        <img
          src={novel.novel_image}
          alt={novel.name}
          onClick={()=>{navigate(`/novel/${novel.id}/`)}}
          className="w-full aspect-[2/1] object-cover"
        />
        <div className="absolute top-4 right-4">
          {novel.isPublic ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Public
            </span>
          ) : (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Private
            </span>
          )}
        </div>
      </div>
      {/* Novel Details */}
      <div 
      onClick={()=>{navigate(`/create-chapter/${novel.id}/${novel.name}/`)}}
      className="p-2" > 
        <h3 className=" font-bold text-white mb-2 line-clamp-1">{novel.name}</h3>


        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {novel.chapter_count} chapters
          </span>
          
          <Pencil className="h-3 w-3 sm:h-5 sm:w-5 hover:scale-105 cursor-pointer"/>
        </div>

        {/* Show likes and views only for public novels */}
        {novel.isPublic && (
          <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-t border-zinc-800">
  
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {novel.views}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {novel.likes}
              </span>
          
          </div>

        )}


      </div>
    </div>
  );
}

export default NovelCard;
