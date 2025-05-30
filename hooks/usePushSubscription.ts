"use client";

import { subscribeUser, unsubscribeUser } from "@/app/actions";
import { DeviceIdContext } from "@/components/DeviceIdProvider/DeviceIdProvider";
import { registerServiceWorker } from "@/helpers/registerServiceWorker";
import { urlBase64ToUint8Array } from "@/helpers/urlBase64ToUnit8Array";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const usePushSubscription = (userId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const deviceIdContext = useContext(DeviceIdContext);

  if (!deviceIdContext) {
    throw new Error("useContext must be used within DeviceIdProvider");
  }

  const { deviceId, setDeviceId, clearDeviceId } = deviceIdContext;

  const handleSubscribe = async () => {
    if (!userId) return;

    setIsLoading(true);
    registerServiceWorker();

    const subscribeToPush = async () => {
      const existingDeviceId = deviceId;

      if (!existingDeviceId) {
        const newDeviceId = uuidv4();
        setDeviceId(newDeviceId);

        try {
          const registration = await navigator.serviceWorker.ready;
          console.log("Service Worker is ready:", registration);

          const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
            ),
          });

          console.log("sub", sub);

          await subscribeUser(sub, newDeviceId, userId);

          window.location.reload();
        } catch (error) {
          console.error("Error subscribing to push:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (typeof window !== "undefined") {
      await subscribeToPush();
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!userId) return;

    if (typeof window !== "undefined" && deviceId) {
      setIsLoading(true);
      try {
        await unsubscribeUser(deviceId, userId);
        localStorage.removeItem("deviceId");
        clearDeviceId();

        window.location.reload();
      } catch (error) {
        console.error("Error unsubscribing:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { isLoading, deviceId, handleSubscribe, handleUnsubscribe };
};
