'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  Briefcase,
  Package,
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Contacts', href: '/admin/contacts', icon: Users },
  { name: 'Waitlist', href: '/admin/waitlist', icon: UserPlus },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Case Studies', href: '/admin/cases', icon: Briefcase },
  { name: 'Modules', href: '/admin/modules', icon: Package },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-navy-800 border border-slate-200 dark:border-slate-700 shadow-lg"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-slate-700 dark:text-slate-300" />
        ) : (
          <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />
        )}
      </button>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-screen w-64 bg-white dark:bg-navy-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out z-40',
          'lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#051c2c] to-[#0a3161] flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  Marsala Admin
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Control Panel
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                        active
                          ? 'bg-[#051c2c] text-white shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800'
                      )}
                    >
                      <Icon className={clsx('h-5 w-5', active ? 'text-white' : 'text-slate-500 dark:text-slate-400')} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                // Handle logout
                window.location.href = '/api/auth/logout';
              }}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>

            <div className="mt-4 px-4">
              <Link
                href="/"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-[#051c2c] dark:hover:text-slate-300 transition-colors"
              >
                Back to website
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
