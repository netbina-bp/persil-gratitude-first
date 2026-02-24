import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { sendPageView } from "@/lib/analytics";

export function GoogleAnalytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      sendPageView("/");
    }
  }, [pathname]);

  return null;
}
