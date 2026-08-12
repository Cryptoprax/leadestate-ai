export function filterModuleRegistry<T extends{id:string}>(items:readonly T[],query:string){const value=query.trim().toLowerCase();return value?items.filter(item=>item.id.toLowerCase().includes(value)):items}

