'use client';

import Navbar from "@/components/Navbar";
import { motion, Variants } from "framer-motion";

export default function TermsPage() {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="min-h-screen bg-white text-deep-purple relative font-sans">
      <Navbar />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={container}
        className="max-w-5xl mx-auto pt-32 pb-20 px-6"
      >
        
        {/* HEADER */}
        <motion.div variants={item} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-header text-accent-red">
            Terms of Service!
          </h1>
          <p className="text-zinc-500">Please read carefully before commissioning.</p>
        </motion.div>

        {/* --- GENERAL & PAYMENT --- */}
        <motion.section variants={item} className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-accent-red font-header border-b-2 border-accent-red/10 pb-2">General & Payment</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <ul className="space-y-4 text-sm leading-relaxed list-disc pl-4 marker:text-accent-red text-deep-purple font-medium">
                <li>Prices are for personal use only. Commercial purpose 1.5 - 2x will be charged.</li>
                <li>There are two types of payment, Full payment and Down Payment (minimum 50% for more than 100 USD purchase).</li>
                <li className="text-accent-red font-bold">There will be an additional 5% tax fee for every transaction via Paypal.</li>
                <li className="text-accent-red font-bold">The price is in USD ($1 = Rp 8.000 for IDR conversion).</li>
                <li>Pay the exact amount after the rough sketch is done.</li>
                <li>Payments through <span className="text-accent-red font-bold">PayPal invoice</span>. For Indonesian, payments can be done through <span className="text-accent-red font-bold">MANDIRI and Gopay</span>.</li>
                <li>Sketch revisions are free but, <span className="text-accent-red font-bold">after sketch revisions (lineart, rendering, and finishing) will get charged $10 usd per revisions</span>. Unless a misunderstanding from my side has been made.</li>
            </ul>
            <ul className="space-y-4 text-sm leading-relaxed list-disc pl-4 marker:text-accent-red text-deep-purple font-medium">
                <li>The prices are for one character. Additional per character cost +20-50% each from the price categories.</li>
                <li>Please provide clear details and references, if it's possible please make a sketch of it (stickman drawing is ok).</li>
                <li>I may decline your commission if I don't feel comfortable with the character design or the request.</li>
                <li>No refunds after the sketch have been approved.</li>
                <li>Finished artwork will be watermarked and may be uploaded to social media (except NSFW art). Please let me know if you want to keep it private.</li>
                <li>You may upload the commissioned artwork on any social media platforms with the watermarked artwork i provided and credit to my work.</li>
            </ul>
          </div>
        </motion.section>

        {/* --- DO'S & DON'TS --- */}
        <motion.section variants={item} className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-accent-red font-header border-b-2 border-accent-red/10 pb-2">Do's & Don'ts</h2>
          
          <div className="overflow-x-auto rounded-lg border border-zinc-300">
            <table className="w-full text-sm text-left min-w-[600px]">
              <thead className="bg-[#EAEAEA] text-deep-purple font-bold uppercase">
                <tr>
                  <th className="px-6 py-3 border-r border-zinc-300 w-1/3">YES</th>
                  <th className="px-6 py-3 border-r border-zinc-300 w-1/3">NO</th>
                  <th className="px-6 py-3 w-1/3">OK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-deep-purple font-medium">
                <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-3">Fanart</td>
                  <td className="px-6 py-3">Insect</td>
                  <td className="px-6 py-3">Furry/Anthro</td>
                </tr>
                <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-3">OC</td>
                  <td className="px-6 py-3">Hateful content</td>
                  <td className="px-6 py-3">Heavy NSFW (R21+)</td>
                </tr>
                <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-3">Kemonomimi/semi furry</td>
                  <td className="px-6 py-3">Heavy armor</td>
                  <td className="px-6 py-3">Animal</td>
                </tr>
                <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-3">NSFW (R-18)</td>
                  <td className="px-6 py-3">Mecha</td>
                  <td className="px-6 py-3">Old people</td>
                </tr>
                <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-3">Real life people</td>
                  <td className="px-6 py-3">Muscular body</td>
                  <td className="px-6 py-3">Certain fetish</td>
                </tr>
                <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-3">Yuri/Yaoi</td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* --- USAGE RIGHTS --- */}
        <motion.section variants={item} className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
             <h2 className="text-3xl font-bold text-accent-red font-header uppercase leading-none">
               personal & <br/> commercial use
             </h2>
             <span className="bg-[#BFBACF] text-deep-purple px-2 py-1 text-sm font-bold mt-2 md:mt-0">
               *commercial use includes free PSD file
             </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-zinc-400">
            <table className="w-full text-sm text-left min-w-[700px]">
              <thead className="bg-[#D8D5E0] text-deep-purple font-bold uppercase border-b border-zinc-400">
                <tr>
                  <th className="px-6 py-3 border-r border-zinc-400 w-1/3">PERSONAL</th>
                  <th className="px-6 py-3 border-r border-zinc-400 w-1/3">COMMERCIAL +100%</th>
                  <th className="px-6 py-3 w-1/3">COMMERCIAL +50%</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-zinc-200">
                <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Design for personal merch and not for sale (e.g Personal Keychains, Dakimakura, etc.)</td>
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Design for selling Merchandise/Prints</td>
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Opening/and Ending Screen Illustration</td>
                </tr>
                <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Photo profile/Icon/Wallpaper</td>
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Illustration for Video/Music Video that makes profit (except charity)</td>
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Stinger Streaming</td>
                </tr>
                <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Personal Illustration and Charity Illustration Post</td>
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Illustration for Advertisement/Game Agency/Company</td>
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Vtuber Character Design Reference</td>
                </tr>
                <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Character Design Reference</td>
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Illustration for an Album cover/Novel Cover/Book Cover</td>
                  <td className="px-6 py-4"></td>
                </tr>
                 <tr className="divide-x divide-zinc-200">
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Personal short comic for social media post/and personal use</td>
                  <td className="px-6 py-4 font-bold text-deep-purple/80">Short Comic art for digital and physical that makes profit</td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* --- WORKFLOW --- */}
        <motion.section variants={item} className="mb-20">
          <h2 className="text-3xl font-bold text-accent-red font-header mb-6 border-b-2 border-accent-red/10 pb-2">workflow</h2>
          <ul className="space-y-4 text-sm text-deep-purple font-medium list-disc pl-4 marker:text-deep-purple">
             <li>While I'm working on your commission I will make reviews with you to make sure I make it just right for you!</li>
             <li>The amount of reviews depends on the complexity of the work.</li>
             <li>The time it takes to finish your commission varies 1 week - 30 days depending on factors such as health, the complexity of the commissioned piece, other work such as college, etc.</li>
             <li>If anything comes up that will slow the progress of the initially estimated delivery time I will let you know ASAP through your DM or Tweet notice.</li>
             <li>Once the piece is finished you will receive the full-resolution image along with a web-friendly size. <span className="bg-[#BFBACF] px-1">*Note that there is no physical product</span></li>
             <li>Will be send through Email or with a G-drive/zip if the file is too big.</li>
          </ul>
        </motion.section>

        {/* --- QUEUE RULES --- */}
        <motion.section variants={item} className="mb-20">
           <h2 className="text-3xl font-bold text-accent-red font-header mb-6 border-b-2 border-accent-red/10 pb-2">Queue</h2>
           <ul className="space-y-4 text-sm text-deep-purple font-medium list-disc pl-4 marker:text-deep-purple">
             <li>I will prioritize clients who paid fully and for those who has estimated deadline.</li>
             <li>Clients who paid 50% will be put below the list of people who paid in full.</li>
             <li>I will let you know a day before i finally start on your commission.</li>
           </ul>
        </motion.section>

        {/* --- WHAT YOU'LL GET & REVISIONS --- */}
        <motion.div variants={item} className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
               <h2 className="text-3xl font-bold text-accent-red font-header mb-4 text-left">What<br/>you'll get</h2>
               <ul className="text-sm text-deep-purple font-medium list-disc pl-4 marker:text-deep-purple space-y-2 text-left">
                   <li>Drafts/mockups that you must decide which one I should continue with (depending on the complexity of the commission there might be fewer or more drafts)</li>
                   <li>Sketch and/or final sketches that you must accept before I continue the work</li>
                   <li>Insight and involvement in color plan (depending on the complexity of the commissioned piece)</li>
                   <li>Final file format is PNG</li>
               </ul>
            </div>
             <div>
               <h2 className="text-3xl font-bold text-accent-red font-header mb-4">Revisions</h2>
               <ul className="text-sm text-deep-purple font-medium list-disc pl-4 marker:text-deep-purple space-y-2">
                   <li>Major Revisions on the lineart process.</li>
                   <li>A fee will be added for a major revision on the final stages/result of your commission. Unless a misunderstanding from my side has been made.</li>
                   <li>If you wish for me to change something in the drawing you have previously approved, I will charge you a fee to change it. The amount of the extra charge depends on the change you want me to make.</li>
                   <li>Please make sure that your reference or description is as clear as possible at the start.</li>
               </ul>
            </div>
        </motion.div>

        {/* --- CANCELLATION & REFUND --- */}
        <motion.section variants={item} className="mb-20">
           <h2 className="text-3xl font-bold text-accent-red font-header mb-6 border-b-2 border-accent-red/10 pb-2">Cancellation &<br/>Refund Policy</h2>
           <ul className="space-y-4 text-sm text-deep-purple font-medium list-disc pl-4 marker:text-deep-purple">
             <li>You're not allowed a refund once I started working on the commission.</li>
             <li>If for any reason I am unable to start your commission, you will receive a full refund.</li>
             <li>If you cancel your order before I started it, you can get a full refund.</li>
             <li>If you're not satisfied with the piece, I will not give refunds or redo the piece, however if I have missed minor details that have already been agreed to, and you would like me to add them in, if possible without ruining the piece, I will add them in.</li>
           </ul>
        </motion.section>

      </motion.div>
       {/* Footer */}
      <footer className="text-center py-6 text-deep-purple/40 text-xs border-t border-deep-purple/5 relative z-30">
        &copy; 2026 reinakocchi. All rights reserved.
      </footer>
    </main>
  );
}