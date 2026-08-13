import type { ConfigurationState } from "../types";
import { defaultConfiguration } from "../config/defaults";

export interface ConfigurationStore { load():ConfigurationState; save(state:ConfigurationState):void; clear():void }
export class LocalConfigurationStore implements ConfigurationStore {
  constructor(private readonly key="vayon:configuration:v1"){}
  load(){if(typeof window==="undefined")return structuredClone(defaultConfiguration);try{const value=localStorage.getItem(this.key);return value?JSON.parse(value) as ConfigurationState:structuredClone(defaultConfiguration)}catch{return structuredClone(defaultConfiguration)}}
  save(state:ConfigurationState){if(typeof window!=="undefined")localStorage.setItem(this.key,JSON.stringify(state))}
  clear(){if(typeof window!=="undefined")localStorage.removeItem(this.key)}
}
export function duplicatePipeline(state:ConfigurationState,id:string):ConfigurationState{const source=state.pipelines.find(p=>p.id===id);if(!source)return state;const suffix=crypto.randomUUID();return{...state,pipelines:[...state.pipelines,{...structuredClone(source),id:`${source.id}-${suffix}`,name:`${source.name} Copy`,isDefault:false,stages:source.stages.map(stage=>({...stage,id:`${stage.id}-${crypto.randomUUID()}`}))}]}}
export function reorder<T>(items:readonly T[],from:number,to:number):T[]{const next=[...items];const[item]=next.splice(from,1);if(item!==undefined)next.splice(to,0,item);return next}
export function exportConfiguration(value:unknown){return JSON.stringify(value,null,2)}
