import { auroraRealtyGroup } from "../config/aurora-realty-group";
export interface DemoNavigationContext { readonly workspaceName:string;readonly organizationDescription:string;readonly logoPlaceholder:string;readonly source:"demo-blueprint";readonly persistence:"none" }
export function getAuroraNavigationContext():DemoNavigationContext { const {company}=auroraRealtyGroup;return Object.freeze({workspaceName:company.workspace.name,organizationDescription:company.description,logoPlaceholder:company.workspace.logoPlaceholder,source:"demo-blueprint",persistence:"none"}) }
