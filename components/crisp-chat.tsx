"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("6965c580-6495-49bf-a542-c63c1fff576a");
  }, []);

  return null;
};
