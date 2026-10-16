"use client";
import {type ButtonHTMLAttributes,type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Counter} from '@/components/ui/counter';
import {ProgressBar} from '@/components/ui/progress-bar';
import {ArrowRight,Check,Compass} from 'lucide-react';
import type {Draft} from '@/data/model';
import {motion,useReducedMotion} from 'motion/react';

export function preparationProgress(draft:Draft){return draft.approved?100:Math.min(86,Math.round(Math.max(draft.step,draft.mapApproved?3:0)/7*100));}
export function JourneyButton({children,variant='primary',href,className='',...props}:ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'primary'|'positive'|'secondary'|'ghost'|'danger';href?:string}){
 const classes=`j-button j-button-${variant} ${className}`;
 return href?<Link className={classes} href={href}>{children}</Link>:<button type="button" {...props} className={classes}>{children}</button>;
}
export function PageIntro({eyebrow,title,description,action,editorial=false}:{eyebrow:string;title:ReactNode;description:string;action?:ReactNode;editorial?:boolean}){
 const reduce=useReducedMotion();
 return <header className={`j-page-intro kinetic-intro ${editorial?'is-editorial':''}`}><div><motion.span className="kinetic-eyebrow" initial={reduce?false:{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{duration:.35}}><span aria-hidden="true"/> {eyebrow}</motion.span><motion.h1 initial={reduce?false:{opacity:0,y:24,rotate:-1}} animate={{opacity:1,y:0,rotate:0}} transition={{type:'spring',stiffness:170,damping:23}}>{title}</motion.h1><motion.p initial={reduce?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.4,delay:reduce?0:.12}}>{description}</motion.p></div>{action&&<motion.div className="j-page-action" initial={reduce?false:{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{duration:.35,delay:reduce?0:.1}}>{action}</motion.div>}</header>;
}
export function StateBadge({children,tone='action'}:{children:ReactNode;tone?:'action'|'success'|'discovery'|'attention'|'achievement'|'neutral'}){return <span className={`j-state j-state-${tone}`}><i aria-hidden="true"/>{children}</span>;}
const mascotSizes={panda:[640,600],pato:[640,590],pinguim:[640,602],cerebro:[640,533]} as const;
export function Mascot({name,className='',priority=false}:{name:'panda'|'pato'|'pinguim'|'cerebro';className?:string;priority?:boolean}){const [width,height]=mascotSizes[name];return <span className={`j-mascot j-mascot-${name} ${className}`} aria-hidden="true"><Image src={`/mascots/${name}.webp`} width={width} height={height} alt="" loading={priority?'eager':'lazy'} priority={priority} className="j-mascot-image"/></span>;}
export function JourneyProgress({value,label,tone='action'}:{value:number;label:string;tone?:'action'|'success'|'achievement'}){return <ProgressBar value={value} label={label} className={`j-progress j-progress-${tone}`}/>;}
export function JourneyTrack({total=6,completed=2,current=2,compact=false}:{total?:number;completed?:number;current?:number;compact?:boolean}){return <ol className={`j-track ${compact?'is-compact':''}`} aria-label="Jornada do módulo">{Array.from({length:total},(_,i)=><li key={i} className={i<completed?'is-done':i===current?'is-now':'is-later'} aria-current={i===current?'step':undefined}><span>{i<completed?<Check size={15}/>:i===current?<Compass size={16}/>:String(i+1).padStart(2,'0')}</span><small>{i<completed?'Concluída':i===current?'Agora':'Depois'}</small></li>)}</ol>;}
export const CountUp = Counter;
export function JourneyEmpty({title,description,children}:{title:string;description:string;children?:ReactNode}){return <div className="j-empty"><Mascot name="pato"/><div><h3>{title}</h3><p>{description}</p>{children}</div></div>;}
export function TextAction({href,children}:{href:string;children:ReactNode}){return <Link href={href} className="j-text-action">{children}<ArrowRight size={17}/></Link>;}
