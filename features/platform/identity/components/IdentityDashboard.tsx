import {
  Building2,
  Fingerprint,
  History,
  KeyRound,
  LockKeyhole,
  Orbit,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import {
  identityDashboardItems,
  type IdentityModuleIcon,
} from "../config/identity-dashboard";
import { StatCard } from "./StatCard";

const icons: Record<IdentityModuleIcon, LucideIcon> = {
  identity: Fingerprint,
  authentication: LockKeyhole,
  organizations: Building2,
  users: UsersRound,
  roles: ShieldCheck,
  permissions: KeyRound,
  audit: History,
  future: Orbit,
};

export function IdentityDashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {identityDashboardItems.map((item) => (
        <StatCard
          key={item.id}
          title={item.title}
          description={item.description}
          value={item.value}
          status={item.status}
          icon={icons[item.iconName]}
          tone={item.tone}
        />
      ))}
    </div>
  );
}
