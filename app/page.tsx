"use client";

import driverIcon from "../public/driver.png";
import workerIcon from "../public/worker.png";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { WorkerLink } from "../components/ui/WorkerLink";
import { useUserRole } from "@/hooks/useUserRole";

export default function Home() {
  const { isWorker, isDriver, isAdmin } = useUserRole();
  const canShowWorkerLink = isWorker || isAdmin;
  const canShowDriverLink = isDriver || isAdmin;

  return (
    <PageWrapper>
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col gap-12 items-center">
          {canShowWorkerLink && (
            <WorkerLink
              icon={workerIcon}
              title="Pracownik produkcji"
              href="/worker"
            />
          )}
          {canShowDriverLink && (
            <WorkerLink icon={driverIcon} title="Wózkowy" href="/driver" />
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
