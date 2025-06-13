import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { User } from "@/hooks/useAdminData";

type UsersProps = {
  users: User[];
};

export const Users = ({ users }: UsersProps) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 md:p-8 border border-gray-700">
      <Accordion type="single" collapsible>
        <AccordionItem value="users" className="border-0">
          <AccordionTrigger className="text-lg md:text-xl font-semibold text-gray-200 hover:no-underline">
            Użytkownicy
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {users.length === 0 ? (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 md:p-6">
                  <p className="text-gray-400 text-center">Brak użytkowników</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="text-gray-200 font-medium">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-gray-400 text-sm">
                          Nr: {user.workerNumber}
                        </span>
                        <span className="text-gray-400 text-sm">
                          Rola:{" "}
                          {user.role === "ADMIN"
                            ? "Administrator"
                            : user.role === "DRIVER"
                            ? "Wózkowy"
                            : "Pracownik"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            user.isSubscribed
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {user.isSubscribed
                            ? "Powiadomienia włączone"
                            : "Powiadomienia wyłączone"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
