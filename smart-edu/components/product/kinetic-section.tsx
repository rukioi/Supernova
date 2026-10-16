"use client";
import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export function KineticSection({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){
 const reduce=useReducedMotion();
 return <motion.section className={className} initial={reduce?false:{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduce?0:.6,delay:reduce?0:delay,ease:[.16,1,.3,1]}}>{children}</motion.section>;
}

export function ReadingTrail({children,className=''}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null);const reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start center','end center']});
 const scaleY=useSpring(scrollYProgress,{stiffness:100,damping:30});
 return <div ref={ref} className={`reading-trail ${className}`}><div className="reading-trail-track" aria-hidden="true"><motion.i style={{scaleY:reduce?1:scaleY,originY:0}}/></div>{children}</div>;
}
