'use client';
import {useSyncExternalStore} from 'react';
import {initialState} from '@/data/seed';
import type {AppState, Draft} from '@/data/model';
let state:AppState=initialState;
let loaded=false;
const listeners=new Set<()=>void>();
const key='smart-edu-demo-v1';
function snapshot(){if(typeof window!=='undefined'&&!loaded){loaded=true;try{const saved=localStorage.getItem(key);if(saved){const parsed=JSON.parse(saved);if(parsed.draft&&parsed.classes&&parsed.session)state=parsed;}}catch{ /* Local demonstration remains usable when storage is unavailable. */ }}return state;}
export function updateStore(updater:(value:AppState)=>AppState){state=updater(snapshot());try{localStorage.setItem(key,JSON.stringify(state));}catch{window.dispatchEvent(new Event('smart-storage-error'));}listeners.forEach(l=>l());}
export function updateDraft(patch:Partial<Draft>,invalidate=true){updateStore(s=>({...s,draft:{...s.draft,...patch,...(invalidate?{approved:false,reviewed:false,previewed:false,published:false}:{} )}}));}
function subscribe(listener:()=>void){listeners.add(listener);return()=>{listeners.delete(listener);};}
export function useStore(){return useSyncExternalStore(subscribe,snapshot,()=>initialState);}
