import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { getAnalyticsData, isAdmin, adminLogout } from '@/services/analytics';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLogin from '@/components/AdminLogin';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

interface AnalyticsSession {
  sessionId: string;
  timestamp: string;
  page: string;
  referrer: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
}

interface AnalyticsEvent {
  sessionId: string;
  timestamp: string;
  eventName: string;
  params: {
    [key: string]: any;
  };
}

interface AnalyticsData {
  sessions: AnalyticsSession[];
  events: AnalyticsEvent[];
  totalPageViews: number;
  totalEvents: number;
  uniqueVisitors: number;
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [view, setView] = useState<'overview' | 'pageviews' | 'events'>('overview');
  const [authenticated, setAuthenticated] = useState<boolean>(isAdmin());
  const navigate = useNavigate();
  
  useEffect(() => {
    // Only fetch data if authenticated
    if (authenticated) {
      const data = getAnalyticsData();
      setAnalyticsData(data);
      
      // Refresh data every 10 seconds
      const interval = setInterval(() => {
        const refreshedData = getAnalyticsData();
        setAnalyticsData(refreshedData);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [authenticated]);
  
  const handleLogout = () => {
    adminLogout();
    setAuthenticated(false);
    navigate('/');
  };
  
  if (!authenticated) {
    return <AdminLogin onLoginSuccess={() => setAuthenticated(true)} />;
  }
  
  if (!analyticsData) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
        <p>Loading analytics data...</p>
      </div>
    );
  }
  
  const { sessions, events, totalPageViews, totalEvents, uniqueVisitors } = analyticsData;
  
  // Get page view counts
  const pageViewCounts = sessions.reduce((acc: {[key: string]: number}, session) => {
    const page = session.page;
    acc[page] = (acc[page] || 0) + 1;
    return acc;
  }, {});
  
  // Get event counts
  const eventCounts = events.reduce((acc: {[key: string]: number}, event) => {
    const eventName = event.eventName;
    acc[eventName] = (acc[eventName] || 0) + 1;
    return acc;
  }, {});

  // --- START NEW KPI CALCULATIONS ---

  const cvDownloads = events.filter(e => e.eventName === 'resume_download').length;
  const formSubmissions = events.filter(e => e.eventName === 'contact_form_submit').length;
  const emailLinkClicks = events.filter(e => e.eventName === 'contact_info_click' && e.params.type === 'email').length;
  const linkedinLinkClicks = events.filter(e => e.eventName === 'contact_info_click' && e.params.type === 'linkedin').length;

  // Sessions over time (daily)
  const sessionsOverTime = sessions.reduce((acc: {[date: string]: { date: string, sessions: number }}, session) => {
    const date = new Date(session.timestamp).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = { date, sessions: 0 };
    }
    acc[date].sessions += 1;
    return acc;
  }, {});
  const sessionsOverTimeData = Object.values(sessionsOverTime).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Traffic sources/medium
  const getSourceMedium = (referrer: string, ownHost: string): string => {
    if (!referrer) return 'Direct';
    try {
      const referrerUrl = new URL(referrer);
      if (referrerUrl.hostname.includes(ownHost)) return 'Direct'; // Internal navigation
      if (referrerUrl.hostname.includes('google.')) return 'Organic Search';
      if (referrerUrl.hostname.includes('bing.')) return 'Organic Search';
      if (referrerUrl.hostname.includes('duckduckgo.')) return 'Organic Search';
      if (referrerUrl.hostname.includes('linkedin.com')) return 'Social (LinkedIn)';
      if (referrerUrl.hostname.includes('twitter.com') || referrerUrl.hostname.includes('t.co')) return 'Social (Twitter)';
      if (referrerUrl.hostname.includes('facebook.com')) return 'Social (Facebook)';
      return `Referral (${referrerUrl.hostname})`;
    } catch (error) {
      return 'Other';
    }
  };
  
  const ownHostname = window.location.hostname; // Or your specific site's hostname if different in some contexts

  const trafficSources = sessions.reduce((acc: {[source: string]: { name: string, value: number }}, session) => {
    const source = getSourceMedium(session.referrer, ownHostname);
    if (!acc[source]) {
      acc[source] = { name: source, value: 0 };
    }
    acc[source].value += 1;
    return acc;
  }, {});
  const trafficSourcesData = Object.values(trafficSources);
  
  // Key Event Counts (example, can be expanded)
  const keyEventCountsData = [
    { name: 'CV Downloads', count: cvDownloads },
    { name: 'Form Submissions', count: formSubmissions },
    { name: 'Email Clicks', count: emailLinkClicks },
    { name: 'LinkedIn Clicks', count: linkedinLinkClicks },
    { name: 'Portfolio Views', count: eventCounts['project_view'] || 0 },
    { name: 'Resume Page Views', count: pageViewCounts['/resume'] || 0 }
  ].filter(item => item.count > 0);

  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF4560', '#775DD0'];

  // --- END NEW KPI CALCULATIONS ---
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalPageViews}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">User Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalEvents}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{uniqueVisitors}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Select value={view} onValueChange={(value: 'overview' | 'pageviews' | 'events') => setView(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Overview</SelectItem>
            <SelectItem value="pageviews">Page Views</SelectItem>
            <SelectItem value="events">Events</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {view === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(pageViewCounts).map(([page, count]) => (
                    <TableRow key={page}>
                      <TableCell>{page}</TableCell>
                      <TableCell className="text-right">{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(eventCounts).map(([event, count]) => (
                    <TableRow key={event}>
                      <TableCell>{event}</TableCell>
                      <TableCell className="text-right">{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
      
      {view === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Sessions Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sessionsOverTimeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false}/>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sessions" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
      
      {view === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={trafficSourcesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {trafficSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Event Counts</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={keyEventCountsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
      
      {view === 'pageviews' && (
        <Card>
          <CardHeader>
            <CardTitle>Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Session ID</TableHead>
                  <TableHead>Referrer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.slice().reverse().map((session, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(session.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{session.page}</TableCell>
                    <TableCell className="font-mono text-xs">{session.sessionId.substring(0, 8)}...</TableCell>
                    <TableCell>{session.referrer || 'Direct'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {view === 'events' && (
        <Card>
          <CardHeader>
            <CardTitle>User Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Session ID</TableHead>
                  <TableHead>Parameters</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.slice().reverse().map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(event.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{event.eventName}</TableCell>
                    <TableCell className="font-mono text-xs">{event.sessionId.substring(0, 8)}...</TableCell>
                    <TableCell className="text-xs">{JSON.stringify(event.params)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Analytics;
