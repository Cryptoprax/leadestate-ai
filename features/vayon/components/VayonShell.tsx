import type { ReactNode } from "react";
import { Suspense } from "react";
import { AuthenticationService } from "@/features/authentication/services/authentication.service";
import { OrganizationService } from "@/features/onboarding/services/organization.service";
import { ProductExperience } from "./ProductExperience";
import { getAuroraNavigationContext } from "../demo-workspace";
// Search/navigation compatibility remains sourced from builder/config/vayon-navigation through ShellHeader.

export async function VayonShell({children}:{readonly children:ReactNode}){const[user,organization]=await Promise.all([new AuthenticationService().user(),new OrganizationService().current()]),demo=getAuroraNavigationContext(),userName=String(user?.user_metadata?.full_name??user?.user_metadata?.name??user?.email?.split("@")[0]??"User"),identity=organization?{userName,workspaceName:organization.name}:{userName,workspaceName:demo.workspaceName,workspaceLogo:demo.logoPlaceholder,organizationDescription:demo.organizationDescription,demoWorkspace:"aurora" as const};return <Suspense><ProductExperience identity={identity}>{children}</ProductExperience></Suspense>}
