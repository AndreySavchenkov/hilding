"use client";

import { useUser } from "@/hooks/useUser";
import { SubscribeButtonImage } from "@/components/Header/components/Navigation/components/UserNavigation/components/SubscribeButton/components/SubscribeButtonImage";
import { usePushSubscription } from "@/hooks/usePushSubscription";
import exitIcon from "@/public/noBell.png";
import notificationIcon from "@/public/bell.png";
import { Spinner } from "@/components/ui/spinner";

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
          <Spinner />
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
