import { AdminSidebar } from '@/components/AdminSidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard | Marsala.dev',
    template: '%s | Admin | Marsala.dev',
  },
  description: 'Marsala.dev admin control panel',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950">
      <AdminSidebar />

      {/* Main content area - offset by sidebar on desktop */}
      <main className="lg:pl-64 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
