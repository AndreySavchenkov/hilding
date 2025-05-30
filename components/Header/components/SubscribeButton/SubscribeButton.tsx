"use client";

import { useUser } from "@/hooks/useUser";
import { SubscribeButtonImage } from "@/components/Header/components/SubscribeButton/components/SubscribeButtonImage";
import { usePushSubscription } from "@/hooks/usePushSubscription";
import exitIcon from "../../../../public/noBell.png";
import notificationIcon from "../../../../public/bell.png";

export const SubscribeButton = () => {
  const { user } = useUser();
  const { isLoading, deviceId, handleSubscribe, handleUnsubscribe } =
    usePushSubscription(user?.id);

  const isShowSubscribeButton = user && deviceId;
  const isShowUnsubscribeButton = user && !deviceId;
  const isShowLoading = isLoading || !user;

  return (
    <>
      {isShowLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      {isShowSubscribeButton && (
        <SubscribeButtonImage
          src={exitIcon}
          alt="Unsubscribe icon"
          onClick={handleUnsubscribe}
          isLoading={isLoading}
        />
      )}
      {isShowUnsubscribeButton && (
        <SubscribeButtonImage
          src={notificationIcon}
          alt="Subscribe icon"
          onClick={handleSubscribe}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
