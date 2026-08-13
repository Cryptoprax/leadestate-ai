import type { DemoDepartmentId } from "../domain/contracts";
export type AuroraEmployeeId=`aurora-person-${string}`;
export type AuroraBusinessUnitId="residential"|"commercial"|"luxury"|"rentals"|"land"|"investment";
export interface AuroraEmployee { readonly id:AuroraEmployeeId;readonly name:string;readonly title:string;readonly departmentId:DemoDepartmentId;readonly officeId:string;readonly businessUnitIds:readonly AuroraBusinessUnitId[];readonly email:string;readonly phone:string;readonly avatarPlaceholder:string;readonly biography:string;readonly responsibilities:readonly string[];readonly reportsTo?:AuroraEmployeeId;readonly skills:readonly string[];readonly yearsOfExperience:number;readonly employmentStatus:"fictional-demo-profile" }
export interface OrganizationChartNode { readonly employee:AuroraEmployee;readonly manager?:AuroraEmployee;readonly directReports:readonly AuroraEmployee[];readonly depth:number }
export type OrganizationChartView="department"|"reporting"|"office"|"business-unit";
export interface OrganizationChartGroup { readonly id:string;readonly label:string;readonly employees:readonly AuroraEmployee[] }
export interface OrganizationChartModel { readonly view:OrganizationChartView;readonly groups:readonly OrganizationChartGroup[];readonly nodes:readonly OrganizationChartNode[] }
export interface AuroraPeopleWorkspace { readonly leadership:readonly AuroraEmployee[];readonly departmentHeads:readonly AuroraEmployee[];readonly recentJoiners:readonly never[];readonly birthdays:readonly never[];readonly announcements:readonly never[];readonly persistence:"none";readonly analytics:"none" }
