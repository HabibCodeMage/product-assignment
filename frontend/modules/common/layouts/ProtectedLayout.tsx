"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BounceLoader } from "react-spinners";
import { useAuth } from "../contexts/AuthContext";
import { UNAUTHENTICATED_ROUTES } from "../constants";

const ProtectedLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loadingApp } = useAuth();
  const pathname = usePathname();

  if (loadingApp)
    return (
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <BounceLoader color="#111827"  />
      </div>
    );
  if (!loadingApp && !user && !UNAUTHENTICATED_ROUTES.includes(pathname))
    return <></>;
  return <>{children}</>;
};

export default ProtectedLayout;
