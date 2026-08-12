import type { ReactNode } from "react";

import { PageContainer } from "../../identity/components/PageContainer";
import { PageHeader } from "../../identity/components/PageHeader";

export interface PageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function PageLayout({
  eyebrow,
  title,
  description,
  children,
  actions,
}: PageLayoutProps) {
  return (
    <PageContainer>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={actions}
      />
      <div className="pt-7">{children}</div>
    </PageContainer>
  );
}
