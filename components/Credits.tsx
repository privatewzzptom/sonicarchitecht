
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Trophy } from 'lucide-react';

const Credits: React.FC = () => {
  const featuredTracks = [
    {
      title: "Try To Love",
      artist: "Lil Baby",
      type: "Single",
      image: "https://i.scdn.co/image/ab67616d0000b273c9a3d018d8b23b380606e709",
      link: "https://open.spotify.com/intl-it/track/78qVD9sN4z5xuBstCJ6RF2?si=3eabbce5c9094127",
      platform: "Spotify"
    },
    {
      title: "When I'll Win",
      artist: "Noodah05 ft. Lil Baby",
      type: "Album",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e9/b0/4d/e9b04d35-a79a-9e5c-1790-371a83ff6478/artwork.jpg/600x600bf-60.jpg",
      link: "https://music.apple.com/it/album/when-ill-win-feat-lil-baby/1842385086?i=1842385091",
      platform: "Apple Music"
    }
  ];

  return (
    <section id="credits" className="py-48 relative z-10 overflow-hidden bg-black">
      <div className="container mx-auto px-6">
        
        {/* ULTRA-CLEAN BILLBOARD ACHIEVEMENT */}
        <div className="flex justify-center mb-64">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-6xl"
          >
            <div className="w-full border-t border-white/5 mb-24 flex justify-between items-center pt-10">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-electric-blue rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                  <span className="text-white/40 font-black tracking-[0.5em] text-[9px] uppercase">Archive Entry 001</span>
                </div>
                <div className="flex items-center gap-3">
                    <Trophy size={14} className="text-amber-500" />
                    <span className="text-white font-black text-[9px] uppercase tracking-widest">Platinum Specification</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-24 items-start w-full">
                <div className="space-y-16">
                    <div className="space-y-6">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Billboard_logo.svg" 
                            alt="Billboard" 
                            className="h-10 invert brightness-200 transition-all duration-700"
                        />
                        <div className="relative">
                          <h2 className="text-8xl md:text-9xl lg:text-[10rem] font-display font-black text-white leading-[0.75] tracking-tighter uppercase italic">
                              #1 <br/>
                              <span className="text-electric-blue">RAP</span> <br/>
                              <span className="text-white/5">ALBUM</span>
                          </h2>
                        </div>
                    </div>
                    
                    <div className="pl-4 border-l-2 border-electric-blue/30 space-y-4">
                        <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[9px]">The Leaks Album</p>
                        <h4 className="text-2xl md:text-3xl font-display font-black text-white uppercase italic leading-none tracking-tight">
                            Lil Baby — Try to Love <br/> 
                            <span className="text-electric-blue text-sm font-bold tracking-widest mt-2 block not-italic">Co-Produced by Wzzptom</span>
                        </h4>
                    </div>
                </div>

                <div className="flex flex-col items-start lg:items-end text-left lg:text-right h-full justify-between gap-12">
                    <div className="space-y-6 lg:max-w-xs">
                        <span className="text-white/20 font-black uppercase tracking-[0.6em] text-[9px]">Verification Protocol</span>
                        <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                            Official chart placement on the Billboard 200 and Top Rap Albums. Precise architectural sound design for the industry's leading voices.
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-start lg:items-end gap-10">
                      <div className="grid grid-cols-2 gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                        <div className="flex flex-col gap-2">
                          <span className="text-white">Chart Peak</span>
                          <span>Position #1</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-white">Category</span>
                          <span>Rap Album</span>
                        </div>
                      </div>
                      
                      <a 
                        href="https://genius.com/artists/Wzzptom"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full overflow-hidden transition-all hover:pr-14"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          Full Credit History <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-electric-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                      </a>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>

        {/* REFINED TRACKS LISTING */}
        <div>
            <div className="flex flex-col items-center gap-6 mb-32 text-center">
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-electric-blue to-transparent"></div>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter">SELECT WORKS</h2>
                <p className="text-slate-600 font-black uppercase tracking-[0.5em] text-[9px]">High-Definition Sonic Artifacts</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {featuredTracks.map((track, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-10 p-8 bg-white/[0.01] border border-white/5 rounded-[3rem] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700"
                >
                    <div className="w-28 h-28 md:w-36 md:h-36 shrink-0 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 relative">
                        <img src={track.image} alt={track.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-electric-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <span className="text-electric-blue font-black uppercase tracking-[0.5em] text-[8px] mb-3">Item 0{index + 1}</span>
                        <h4 className="text-3xl font-display font-black text-white uppercase italic mb-2 group-hover:text-electric-blue transition-colors leading-none tracking-tight">{track.title}</h4>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">{track.artist}</p>
                        
                        <a 
                            href={track.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-all"
                        >
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                              <Play size={12} className="fill-current ml-0.5" />
                            </div>
                            Stream Project
                        </a>
                    </div>
                </motion.div>
            ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default Credits;
