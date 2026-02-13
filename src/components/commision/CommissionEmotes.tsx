'use client';

import Image from 'next/image';

// Ganti nama file sesuai gambar emote sheet kamu
const EMOTE_IMAGES = ['sheet.png'];

const PRICING_EMOTES = [
  { label: 'Per 6 Characters', price: 45 },
];

interface Props {
  onOpenModal: () => void;
  onViewImage: (src: string) => void;
}

export default function CommissionEmotes({ onOpenModal, onViewImage }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 min-h-[400px]">
       
       {/* KIRI: GAMBAR (SINGLE SHEET SHOWCASE) */}
       <div className="w-full md:w-1/2 self-start">
          {EMOTE_IMAGES.map((img, idx) => (
             <div 
               key={idx} 
               onClick={() => onViewImage(`/emotes/${img}`)}
               // Aspect ratio disesuaikan agar sheet kotak terlihat penuh
               className="relative w-full aspect-square bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200 group cursor-pointer shadow-sm hover:shadow-md transition-all"
             >
                <Image 
                  src={`/emotes/${img}`} // Pastikan folder public/emotes/ ada
                  alt={`Emote Sheet`} 
                  fill 
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  // 'object-contain' agar seluruh grid emote terlihat utuh (tidak kepotong)
                  className="object-contain p-4" 
                />
                
                {/* Overlay Hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all flex items-center justify-center">
                   <span className="opacity-0 group-hover:opacity-100 text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm transition-opacity">
                     View Details
                   </span>
                </div>
             </div>
          ))}
       </div>

       {/* KANAN: DESKRIPSI & HARGA */}
       <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-8">
             <h2 className="text-3xl font-bold text-deep-purple mb-4 font-header">Emotes</h2>
             
             {/* Deskripsi SAMA PERCIS dengan Chibi (Sesuai Request) */}
             <p className="text-zinc-600 text-sm leading-relaxed mb-4">
               A single or multiple character with plain or simple background (sky, pattern, solid color) + transparent.
             </p>
             {/* --- ETA BADGE --- */}
              <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6 bg-zinc-50 px-3 py-2 rounded-lg w-fit border border-zinc-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span><strong>ETA:</strong> 2 Weeks</span>
              </div>
             <div className="bg-deep-purple/5 text-deep-purple px-4 py-3 rounded-xl text-xs font-medium border border-deep-purple/10 leading-relaxed">
               *Price can increase +$5-$10 depending on complexity, such as adding an object like a weapon/effect/pet.
             </div>
          </div>

          {/* TABEL HARGA */}
          <div className="border border-zinc-200 rounded-xl overflow-hidden mb-8 shadow-sm">
            <div className="flex bg-deep-purple text-white text-xs font-bold uppercase py-3 px-5 tracking-wide">
              <div className="flex-1">Emotes Pack</div>
              <div className="w-24 text-right">Price</div>
            </div>
            <div className="bg-white divide-y divide-zinc-100">
             {PRICING_EMOTES.map((item, idx) => (
               <div 
                 key={idx} 
                 className="flex justify-between items-center p-4 hover:bg-zinc-50 transition-colors"
               >
                 <div className="font-bold text-sm text-deep-purple">
                   {item.label}
                 </div>
                 <div className="font-bold font-header text-accent-red">
                   ${item.price}
                 </div>
               </div>
             ))}
            </div>
         </div>

         <button 
           onClick={onOpenModal} 
           className="w-full bg-accent-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#7a3542] hover:shadow-xl active:scale-95 transition-all"
         >
           Order Here!
         </button>
       </div>
    </div>
  );
}