"use client";

import driverIcon from "../public/driver.png";
import workerIcon from "../public/worker.png";
import cpsIcon from "../public/cps.png";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { WorkerLink } from "../components/ui/WorkerLink";
import { useUserRole } from "@/hooks/useUserRole";

export default function Home() {
  const { isWorker, isDriver, isAdmin } = useUserRole();
  const canShowWorkerLink = isWorker || isAdmin;
  const canShowDriverLink = isDriver || isAdmin;

  return (
    <PageWrapper>
      <div className="h-full w-full flex items-center justify-center p-4">
        <div className="flex flex-col gap-4 items-center w-full max-w-sm">
          {canShowWorkerLink && (
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <WorkerLink icon={workerIcon} title="CPW" href="/worker" />
              <WorkerLink icon={cpsIcon} title="CPS" href="/cps" />
            </div>
          )}
          {canShowDriverLink && (
            <div className="w-full">
              <WorkerLink icon={driverIcon} title="Aktualne zamówienia" href="/driver" />
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
