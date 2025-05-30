import { Spinner } from "@/components/ui/spinner";

export const LoadingState = () => {
  return (
    <div className="h-[calc(100vh-70px)] p-6 flex items-center justify-center">
      <Spinner />
    </div>
  );
};
