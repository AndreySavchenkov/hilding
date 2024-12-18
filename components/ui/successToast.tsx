import { CheckIcon } from "@radix-ui/react-icons";

export const SuccessToast = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <CheckIcon className="h-5 w-5 text-white" />
      </div>
      <span className="font-medium text-white">{text}</span>
    </div>
  );
};
