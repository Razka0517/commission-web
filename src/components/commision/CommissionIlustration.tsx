'use client';

import Image from 'next/image';

const ILLUST_IMAGES = [
  'sample1.png', 'sample2.jpg', 'sample3.png', 
  'sample4.png', 'sample5.png', 'sample6.png'
];

interface Props {
  onOpenModal: () => void;
  onViewImage: (src: string) => void;
}

export default function CommissionIllustration({ onOpenModal, onViewImage }: Props) {
  return (
    <div className="flex flex-col items-center">
       <div className="max-w-2xl text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-purple mb-4 font-header">Full Illustration</h2>
          <p className="text-zinc-600 text-sm leading-relaxed mb-4">
            A single or multiple character with complex background.<br/>
            Price can vary depending on complexity within the range.
          </p>
          {/* --- ETA BADGE --- */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6 bg-zinc-50 px-3 py-2 rounded-lg w-fit border border-zinc-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span><strong>ETA:</strong> 2 Weeks - 1 Month</span>
          </div>
          <div className="bg-deep-purple/5 text-deep-purple px-4 py-2 rounded-lg text-xs font-bold inline-block border border-deep-purple/10">
            *Please contact me first to discuss and negotiate!
          </div>
       </div>

       {/* REVISI: Grid tetap, tapi Aspect Ratio jadi LANDSCAPE (Video) biar gak ngecrop */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mb-10">
          {ILLUST_IMAGES.map((img, index) => (
            <div 
              key={index} 
              onClick={() => onViewImage(`/illustration/${img}`)}
              // UBAH DARI aspect-[3/4] MENJADI aspect-video (Landscape 16:9)
              className="relative aspect-video bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200 group shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <Image 
                src={`/illustration/${img}`} 
                alt={`Illust ${index}`} 
                fill 
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                // object-cover akan mengisi penuh kotak landscape
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold">Sample #{index + 1}</span>
              </div>
              <div className="hidden md:block absolute top-2 right-2 bg-black/50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                 <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              </div>
            </div>
          ))}
       </div>

       <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <div className="w-full flex justify-between items-center p-4 bg-white border border-zinc-200 rounded-xl shadow-sm">
             <div className="text-sm font-bold text-deep-purple">Estimated Price Range</div>
             <div className="text-xl font-bold text-accent-red font-header">$100 - $500</div>
          </div>
          <button onClick={onOpenModal} className="w-full bg-accent-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#7a3542] active:scale-95 transition-all">
             Order Here!
          </button>
       </div>
    </div>
  );
}