import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    FolderOpen,
    Truck,
    Receipt,
    BarChart3,
    Users,
    LogOut,
    Search,
    Bell,
    PanelLeft,
} from "lucide-react";

import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import FlashMessage from "@/Components/FlashMessage";

export default function AdminLayout({ children }) {
    const { url, props } = usePage();
    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem("sidebar-collapsed");

        return saved === "true";
    });

    useEffect(() => {
        localStorage.setItem(
            "sidebar-collapsed",
            collapsed
        );
    }, [collapsed]);

    const user = props.auth.user;

    const menus = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Kasir",
            href: "/cashier",
            icon: ShoppingCart,
        },
        {
            name: "Transaksi",
            href: "/transactions",
            icon: Receipt,
        },
    ];

    const adminMenus = [
        {
            name: "Kategori",
            href: "/categories",
            icon: FolderOpen,
        },
        {
            name: "Produk",
            href: "/products",
            icon: Package,
        },
        {
            name: "Supplier",
            href: "/suppliers",
            icon: Truck,
        },
        {
            name: "Laporan",
            href: "/reports",
            icon: BarChart3,
        },
        {
            name: "User",
            href: "/users",
            icon: Users,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F6F6F6] flex overflow-x-hidden">

            {/* Sidebar */}
            <aside
                className={`${
                    collapsed ? "w-24" : "w-72"
                } bg-[#111111] text-white flex flex-col p-6 transition-all duration-300`}
            >

                <div>
                    {!collapsed && (
                        <>
                            <h1 className="text-3xl font-black">
                                KALIMA
                            </h1>

                            <p className="text-sm text-gray-400 mt-1">
                                Point of Sale System
                            </p>
                        </>
                    )}

                    {collapsed && (
                        <h1 className="text-3xl font-black text-center">
                            K
                        </h1>
                    )}
                </div>

                <nav className="mt-10 space-y-2">

                    {menus.map((menu) => {
                        const Icon = menu.icon;

                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                    url.startsWith(menu.href)
                                        ? "bg-white text-black shadow-lg"
                                        : "text-gray-300 hover:bg-[#1f1f1f]"
                                }`}
                            >
                                <Icon size={20} />

                                {!collapsed && (
                                    <span>{menu.name}</span>
                                )}
                            </Link>
                        );
                    })}

                    {user.role === "admin" && (
                        <>
                            <div className="border-t border-gray-700 my-5" />

                            {adminMenus.map((menu) => {
                                const Icon = menu.icon;

                                return (
                                    <Link
                                        key={menu.href}
                                        href={menu.href}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                            url.startsWith(menu.href)
                                                ? "bg-white text-black shadow-lg"
                                                : "text-gray-300 hover:bg-[#1f1f1f]"
                                        }`}
                                    >
                                        <Icon size={20} />

                                        {!collapsed && (
                                            <span>{menu.name}</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </>
                    )}
                </nav>

                <div className="mt-auto border-t border-gray-700 pt-6">

                    <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} mb-5`}>

                        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                        </div>

                        {!collapsed && (
                            <div>

                                <p className="font-semibold">
                                    {user.name}
                                </p>

                                <p className="text-sm text-gray-400 capitalize">
                                    {user.role}
                                </p>

                            </div>
                        )}

                    </div>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-black py-3 hover:bg-gray-200 transition"
                    >
                        <LogOut size={18} />

                        {!collapsed && "Logout"}
                    </Link>

                </div>

            </aside>

            {/* Content */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Topbar */}
                <header className="h-auto lg:h-20 bg-white border-b px-4 md:px-6 lg:px-8 py-4 lg:py-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="rounded-xl border border-neutral-200 p-2 hover:bg-neutral-100 transition"
                    >
                        <PanelLeft size={20} />
                    </button>

                    <div className="flex items-center justify-between lg:justify-end gap-5 w-full lg:w-auto">

                        <button className="relative">

                            <Bell size={22} />

                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />

                        </button>

                        <div className="text-right">

                            <p className="font-semibold">
                                {user.name}
                            </p>

                            <p className="text-xs text-gray-500 capitalize">
                                {user.role}
                            </p>

                        </div>

                    </div>

                </header>

                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">

                    <FlashMessage />

                    {children}

                </main>

            </div>

        </div>
    );
}