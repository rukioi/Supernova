"use client";
import {useEffect,useRef,useState,useSyncExternalStore,type ButtonHTMLAttributes,type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {animate,motion,useInView,useReducedMotion} from 'motion/react';
import {ArrowRight,Check,Compass} from 'lucide-react';
import type {Draft} from '@/data/model';

export function preparationProgress(draft:Draft){return draft.approved?100:Math.min(86,Math.round(Math.max(draft.step,draft.mapApproved?3:0)/7*100));}
export function JourneyButton({children,variant='primary',href,className='',...props}:ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'primary'|'positive'|'secondary'|'ghost'|'danger';href?:string}){
 const classes=`j-button j-button-${variant} ${className}`;
 return href?<Link className={classes} href={href}>{children}</Link>:<button type="button" {...props} className={classes}>{children}</button>;
}
export function PageIntro({title,description,action,editorial=false}:{eyebrow:string;title:ReactNode;description:string;action?:ReactNode;editorial?:boolean}){return <header className={`j-page-intro ${editorial?'is-editorial':''}`}><div><h1>{title}</h1><p>{description}</p></div>{action&&<div className="j-page-action">{action}</div>}</header>;}
export function StateBadge({children,tone='action'}:{children:ReactNode;tone?:'action'|'success'|'discovery'|'attention'|'achievement'|'neutral'}){return <span className={`j-state j-state-${tone}`}><i aria-hidden="true"/>{children}</span>;}
const subscribeHydration=()=>()=>{};const getHydratedSnapshot=()=>true;const getServerSnapshot=()=>false;
const mascotSizes={panda:[640,600],pato:[640,590],pinguim:[640,602],cerebro:[640,533]} as const;
export function Mascot({name,className='',priority=false}:{name:'panda'|'pato'|'pinguim'|'cerebro';className?:string;priority?:boolean}){const [width,height]=mascotSizes[name];return <span className={`j-mascot j-mascot-${name} ${className}`} aria-hidden="true"><Image src={`/mascots/${name}.webp`} width={width} height={height} alt="" loading={priority?'eager':'lazy'} priority={priority} className="j-mascot-image"/></span>;}
export function JourneyProgress({value,label,tone='action'}:{value:number;label:string;tone?:'action'|'success'|'achievement'}){const ref=useRef<HTMLDivElement>(null);const visible=useInView(ref,{once:true});const reduce=useReducedMotion();const hydrated=useSyncExternalStore(subscribeHydration,getHydratedSnapshot,getServerSnapshot);const percent=Math.max(0,Math.min(100,value));return <div ref={ref} className={`j-progress j-progress-${tone}`}><span>{label}<b>{percent}%</b></span><div role="progressbar" aria-label={label} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><motion.i initial={false} animate={{transform:`scaleX(${hydrated&&(reduce||visible)?percent/100:0})`}} transition={{duration:reduce?0:.6,ease:[.22,1,.36,1]}}/></div></div>;}
export function JourneyTrack({total=6,completed=2,current=2,compact=false}:{total?:number;completed?:number;current?:number;compact?:boolean}){return <ol className={`j-track ${compact?'is-compact':''}`} aria-label="Jornada do módulo">{Array.from({length:total},(_,i)=><li key={i} className={i<completed?'is-done':i===current?'is-now':'is-later'} aria-current={i===current?'step':undefined}><span>{i<completed?<Check size={15}/>:i===current?<Compass size={16}/>:String(i+1).padStart(2,'0')}</span><small>{i<completed?'Concluída':i===current?'Agora':'Depois'}</small></li>)}</ol>;}
export function CountUp({value,suffix=''}:{value:number;suffix?:string}){const ref=useRef<HTMLSpanElement>(null);const visible=useInView(ref,{once:true});const reduce=useReducedMotion();const [display,setDisplay]=useState(value);useEffect(()=>{if(!visible||reduce)return;const controls=animate(0,value,{duration:.65,ease:'easeOut',onUpdate:v=>setDisplay(Math.round(v))});return()=>controls.stop();},[visible,reduce,value]);return <span ref={ref} aria-label={`${value}${suffix}`}><span aria-hidden="true">{display}{suffix}</span></span>;}
export function JourneyEmpty({title,description,children}:{title:string;description:string;children?:ReactNode}){return <div className="j-empty"><Mascot name="pato"/><div><h3>{title}</h3><p>{description}</p>{children}</div></div>;}
export function TextAction({href,children}:{href:string;children:ReactNode}){return <Link href={href} className="j-text-action">{children}<ArrowRight size={17}/></Link>;}
