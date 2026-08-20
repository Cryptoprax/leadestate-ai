import type{Metadata}from"next";import{DeveloperPortal}from"@/features/platform/knowledge/components/DeveloperPortal";import{DocumentationService}from"@/features/platform/knowledge/services/documentation.service";
export const metadata:Metadata={title:"Developer Portal",description:"VAYON architecture guides and OpenAPI-ready API reference.",alternates:{canonical:"/developers"}};
export default function Page(){return <DeveloperPortal resources={new DocumentationService().api()}/>}
