"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, Bell } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/modules/common/contexts/AuthContext";
import toast from "react-hot-toast";
import { setTokenToLocalStorage } from "@/modules/common/utils";
import Avatar from "@/modules/common/components/Avatar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-200">
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`${
          sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
        } fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <svg
              className="w-12 h-12"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                fill="#4C51BF"
                stroke="#4C51BF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                fill="white"
              ></path>
            </svg>

            <span className="mx-2 text-2xl font-semibold text-white">
              Products
            </span>
          </div>
        </div>

        <nav className="mt-10">
          <Link
            className={`no-underline flex items-center px-6 py-2 mt-4 text-gray-100  ${
              pathname === "/dashboard" ? "bg-gray-700" : ""
            } `}
            href="/dashboard"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              ></path>
            </svg>

            <span className="mx-3">Products</span>
          </Link>

          <Link
            className={`no-underline flex items-center px-6 py-2 mt-4 text-gray-100  ${
              pathname === "/dashboard/add" ? "bg-gray-700" : ""
            } `}
            href="/dashboard/add"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
              ></path>
            </svg>

            <span className="mx-3 no-underline">Add Product</span>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative block w-[32] h-[32] overflow-hidden rounded-full shadow   border-none cursor-pointer"
              >
                <Avatar
                  character={user?.username ? user.username[0] : ""}
                  size={32}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white capitalize no-underline"
                  >
                    {user?.username}
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white no-underline"
                    onClick={() => {
                      setTokenToLocalStorage("");
                      toast.success("Logout!");
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
