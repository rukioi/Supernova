'use client';
import {Check,Target,Users,Lightbulb,Flag} from 'lucide-react';
import {concepts} from '@/data/seed';
import {Status} from './ui';
export function LearningMap(){const icons=[Check,Users,Target,Lightbulb];return <div className="learning-map">{concepts.map((c,i)=>{const Icon=icons[i];return <div className={`learning-node node-${i}`} key={c.name}><div className="node-symbol"><Icon size={21}/></div><span className="node-index">OBJETIVO 0{i+1}</span><h3>{c.name}</h3><Status status={c.state}/>{c.value>0?<p>{c.value}% de evidências favoráveis</p>:<p>Próxima etapa da turma</p>}</div>;})}<div className="map-caption"><Flag size={14}/> Cada objetivo conecta a aula de hoje à próxima conquista.</div></div>;}
