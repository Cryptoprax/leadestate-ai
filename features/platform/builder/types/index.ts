export type RegistryStatus="draft"|"active"|"disabled"|"deprecated";
export type ModuleCategory="core"|"sales"|"operations"|"intelligence"|"growth"|"platform";
export type NavigationSurface="sidebar"|"topbar"|"quick-action"|"dashboard-card"|"tab"|"menu"|"context-menu";
export interface FeatureFlag{key:string;enabled:boolean;audience:"all"|"beta"|"premium"|"enterprise";aiEnabled?:boolean}
export interface PermissionRequirement{allOf?:readonly string[];anyOf?:readonly string[]}
export interface NavigationItem{id:string;label:string;href?:string;icon?:string;surface:NavigationSurface;order:number;visible:boolean;moduleId?:string;featureId?:string;permission?:PermissionRequirement;children?:readonly NavigationItem[]}
export interface Menu{id:string;name:string;surface:NavigationSurface;items:readonly NavigationItem[]}
export interface DashboardWidget{id:string;name:string;description:string;moduleId:string;featureId?:string;enabled:boolean;visible:boolean;order:number;size:"sm"|"md"|"lg"|"full"}
export interface SettingsField{id:string;label:string;description?:string;type:"text"|"email"|"phone"|"url"|"color"|"number"|"boolean"|"select";required?:boolean;defaultValue?:unknown;options?:readonly{label:string;value:string}[]}
export interface SettingsSection{id:string;title:string;description:string;order:number;visible:boolean;permission?:PermissionRequirement;fields:readonly SettingsField[]}
export interface Theme{id:string;name:string;mode:"light"|"dark"|"system";colors:Readonly<Record<string,string>>;typography:{fontFamily:string;headingFontFamily?:string;scale:string};radius:string;iconSet:string}
export interface Brand{id:string;companyName:string;logo?:string;favicon?:string;supportEmail:string;supportPhone?:string;themeId:string;colors:Readonly<Record<string,string>>;typography:string;borderRadius:string;icons:string}
export interface Feature{id:string;moduleId:string;name:string;slug:string;description:string;status:RegistryStatus;enabled:boolean;visible:boolean;beta:boolean;premium:boolean;enterprise:boolean;aiEnabled:boolean;permissions:readonly string[];flags:readonly FeatureFlag[]}
export interface Module{id:string;name:string;slug:string;description:string;icon:string;category:ModuleCategory;version:string;status:RegistryStatus;enabled:boolean;visible:boolean;navigation:readonly string[];permissions:readonly string[];dependencies:readonly string[];settings:readonly string[];features:readonly string[]}
export interface Application{id:string;name:string;slug:string;description:string;version:string;status:RegistryStatus;installed:boolean;enabled:boolean;moduleIds:readonly string[];brandId:string;themeId:string}
export interface BuilderRegistry{applications:readonly Application[];modules:readonly Module[];features:readonly Feature[];navigation:readonly NavigationItem[];menus:readonly Menu[];widgets:readonly DashboardWidget[];brands:readonly Brand[];themes:readonly Theme[];settings:readonly SettingsSection[]}

