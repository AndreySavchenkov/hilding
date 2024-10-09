"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface DeviceIdContextProps {
  deviceId: string | null;
  setDeviceId: (deviceId: string | null) => void;
  clearDeviceId: () => void;
}

export const DeviceIdContext = createContext<DeviceIdContextProps | undefined>(
  undefined
);

export const DeviceIdProvider = ({ children }: { children: ReactNode }) => {
  const [deviceId, setDeviceIdState] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDeviceId = localStorage.getItem("deviceId");
      if (storedDeviceId) {
        setDeviceIdState(storedDeviceId);
      }
    }
  }, []);

  const setDeviceId = (newDeviceId: string | null) => {
    setDeviceIdState(newDeviceId);

    if (newDeviceId) {
      localStorage.setItem("deviceId", newDeviceId);
    } else {
      localStorage.removeItem("deviceId");
    }
  };

  const clearDeviceId = () => {
    localStorage.removeItem("deviceId");
    setDeviceIdState(null);
  };

  return (
    <DeviceIdContext.Provider value={{ deviceId, setDeviceId, clearDeviceId }}>
      {children}
    </DeviceIdContext.Provider>
  );
};
