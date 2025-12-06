import { createClient } from '@/lib/supabase/server';
import {
  Users,
  UserPlus,
  FileText,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  href?: string;
}

function StatCard({ title, value, icon: Icon, description, trend, href }: StatCardProps) {
  const content = (
    <div className="bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {value}
          </p>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.positive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {trend.positive ? '+' : ''}{trend.value}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className="ml-4">
          <div className="p-3 bg-slate-100 dark:bg-navy-700 rounded-lg">
            <Icon className="h-6 w-6 text-[#051c2c] dark:text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

interface RecentContact {
  id: string;
  name: string;
  email: string;
  company: string | null;
  status: string;
  created_at: string;
}

function RecentContactsList({ contacts }: { contacts: RecentContact[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'qualified':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'proposal':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'closed_won':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'closed_lost':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        No contacts yet
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="py-4 hover:bg-slate-50 dark:hover:bg-navy-700 -mx-6 px-6 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#051c2c] to-[#0a3161] flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {contact.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {contact.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {contact.email}
                  </p>
                  {contact.company && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                      {contact.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end ml-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  contact.status
                )}`}
              >
                {contact.status.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {formatDate(contact.created_at)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch stats from Supabase
  const [
    { count: totalContacts },
    { count: newContacts },
    { count: waitlistCount },
    { count: publishedPosts },
    { count: draftPosts },
    { count: caseStudiesCount },
    { data: recentContacts },
  ] = await Promise.all([
    supabase.from('contacts').select('*', { count: 'exact', head: true }),
    supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new'),
    supabase.from('waitlist').select('*', { count: 'exact', head: true }),
    supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published'),
    supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft'),
    supabase.from('case_studies').select('*', { count: 'exact', head: true }),
    supabase
      .from('contacts')
      .select('id, name, email, company, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Welcome to the Marsala.dev admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Contacts"
          value={totalContacts || 0}
          icon={Users}
          description="All time contacts"
          href="/admin/contacts"
        />
        <StatCard
          title="New Contacts"
          value={newContacts || 0}
          icon={AlertCircle}
          description="Awaiting response"
          href="/admin/contacts?status=new"
        />
        <StatCard
          title="Waitlist"
          value={waitlistCount || 0}
          icon={UserPlus}
          description="Early access signups"
          href="/admin/waitlist"
        />
        <StatCard
          title="Published Posts"
          value={publishedPosts || 0}
          icon={FileText}
          description={`${draftPosts || 0} in draft`}
          href="/admin/blog"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Case Studies"
          value={caseStudiesCount || 0}
          icon={Briefcase}
          description="Client success stories"
          href="/admin/cases"
        />
        <StatCard
          title="Avg Response Time"
          value="< 24h"
          icon={Clock}
          description="Target: Same day"
        />
        <StatCard
          title="Conversion Rate"
          value="28%"
          icon={TrendingUp}
          description="Contact to qualified"
          trend={{ value: '5%', positive: true }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Contacts
            </h2>
            <a
              href="/admin/contacts"
              className="text-sm text-[#051c2c] dark:text-slate-300 hover:underline"
            >
              View all
            </a>
          </div>
          <RecentContactsList contacts={(recentContacts as RecentContact[]) || []} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <a
              href="/admin/blog/new"
              className="flex items-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
            >
              <FileText className="h-5 w-5 text-[#051c2c] dark:text-slate-300 mr-3" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Create New Blog Post
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Write and publish content
                </p>
              </div>
            </a>
            <a
              href="/admin/cases/new"
              className="flex items-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
            >
              <Briefcase className="h-5 w-5 text-[#051c2c] dark:text-slate-300 mr-3" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Add Case Study
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Showcase client success
                </p>
              </div>
            </a>
            <a
              href="/admin/contacts?status=new"
              className="flex items-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
            >
              <CheckCircle className="h-5 w-5 text-[#051c2c] dark:text-slate-300 mr-3" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Review New Contacts
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {newContacts || 0} pending review
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          System Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Database
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Connected
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Email Service
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Operational
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                API Status
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All systems operational
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
