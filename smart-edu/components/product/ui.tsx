'use client';
import type {ReactNode} from 'react';
import {Plus,Check,Search} from 'lucide-react';
import {LocalTabs} from './editorial-motion';
import {JourneyButton,JourneyEmpty,PageIntro,StateBadge} from './journey-ui';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
export function Badge({children,tone='neutral'}:{children:ReactNode;tone?:string}){return <StateBadge tone={tone==='indigo'?'action':tone==='teal'?'success':tone==='amber'?'attention':tone==='violet'?'discovery':'neutral'}>{children}</StateBadge>;}
export function PageHead({eyebrow,title,description,children}:{eyebrow?:string;title:string;description?:string;children?:ReactNode}){return <PageIntro eyebrow={eyebrow||'ESPAÇO DOCENTE'} title={title} description={description||''} action={children}/>;}
export function Prepare({href='/preparar-aula',small=false}:{href?:string;small?:boolean}){return <JourneyButton href={href} className={small?'j-button-sm':''}><Plus size={17}/>Preparar aula</JourneyButton>;}
export function SectionHead({title,children,kicker}:{title:string;children?:ReactNode;kicker?:string}){return <div className="section-head"><div>{kicker&&<p className="eyebrow">{kicker}</p>}<h2>{title}</h2></div>{children}</div>;}
export function NavTabs({items,value,onChange}:{items:string[];value:string;onChange:(v:string)=>void}){return <LocalTabs items={items} value={value} onChange={onChange}/>;}
export function Picker({label,value,options,onChange}:{label:string;value:string;options:(string|{label:string;value:string})[];onChange:(v:string)=>void}){return <label className="field"><span>{label}</span><Select value={value} onValueChange={onChange}><SelectTrigger className="product-select" aria-label={label}><SelectValue/></SelectTrigger><SelectContent>{options.map(o=><SelectItem key={typeof o==='string'?o:o.value} value={typeof o==='string'?o:o.value}>{typeof o==='string'?o:o.label}</SelectItem>)}</SelectContent></Select></label>;}
export function SearchBox({value,onChange,placeholder='Rechercher'}:{value:string;onChange:(v:string)=>void;placeholder?:string}){return <label className="searchbox"><Search size={17}/><input aria-label={placeholder} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></label>;}
export function Empty({title,description,children}:{title:string;description:string;children?:ReactNode}){return <JourneyEmpty title={title} description={description}>{children}</JourneyEmpty>;}
export function Avatar({name,index=0}:{name:string;index?:number}){return <span className={`avatar avatar-${index%4}`}>{name.split(' ').slice(0,2).map(n=>n[0]).join('')}</span>;}
export function Status({status}:{status:string}){return <Badge tone={status.includes('Aprovado')||status==='Consolidado'||status==='Executada'?'teal':status.includes('Sugestão')||status==='Em preparação'?'amber':status==='Não avaliado'?'neutral':'indigo'}>{status.includes('Aprovado')&&<Check size={12}/>} {status}</Badge>;}
export function ProgressBar({value,tone='indigo'}:{value:number;tone?:string}){return <div className={`bar ${tone}`} role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso"><span style={{width:`${value}%`}}/></div>;}
