export interface CacheOptions{ttlMs:number;tags?:readonly string[]}
export interface CacheProvider{readonly id:string;get<T>(key:string):Promise<T|undefined>;set<T>(key:string,value:T,options:CacheOptions):Promise<void>;invalidate(tags:readonly string[]):Promise<number>;metrics():{hits:number;misses:number;writes:number;evictions:number;hitRatio:number|null}}
export interface PerformanceMetric{name:string;value:number|null;unit:"ms"|"bytes"|"ratio"|"mb";budget:number|null;state:"within_budget"|"over_budget"|"unavailable"}
export interface PerformanceSnapshot{metrics:readonly PerformanceMetric[];slowQueries:number;slowEndpoints:number;cache:{provider:string;hits:number;misses:number;writes:number;evictions:number;hitRatio:number|null};memoryMb:number;generatedAt:string}
