import driverIcon from "../public/driver.png";
import workerIcon from "../public/worker.png";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { WorkerLink } from "./components/WorkerLink";

export default function Home() {
  return (
    <PageWrapper>
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col gap-12 items-center">
          <WorkerLink
            icon={workerIcon}
            title="Pracownik produkcji"
            href="/worker"
          />
          <WorkerLink icon={driverIcon} title="Wózkowy" href="/driver" />
        </div>
      </div>
    </PageWrapper>
  );
}
