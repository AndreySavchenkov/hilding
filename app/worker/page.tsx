import { ChooseWorkerPlaceForm } from "./components/ChooseWorkerPlaceForm/ChooseWorkerPlaceForm";

export default function Worker() {
  return (
    <div className="h-[calc(100vh-83px)]  p-4 overflow-y-auto">
      <div className="max-w-screen-lg mx-auto py-4 md:py-6">
        <ChooseWorkerPlaceForm />
      </div>
    </div>
  );
}
