/**
 * @typedef {import("pusher-js/types/src/core/events/dispatcher").default} Dispatcher
 */

import { useEffect, useState } from "react";

/**
 * @param {Dispatcher} dispatcher
 */
export const useEvent = (dispatcher, eventName, callback) => {
  const [bind, setBind] = useState(false);

  useEffect(() => {
    if (dispatcher && !bind) {
      dispatcher.bind(eventName, callback);
      setBind(true);
    }

    return () => {
      if (bind) {
        dispatcher.unbind(eventName, callback);
        setBind(false);
      }
    };
  }, [dispatcher, eventName, callback]);
};
