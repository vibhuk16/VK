
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
import { getAnalyticsData } from '@/services/analytics';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  
  useEffect(() => {
    const data = getAnalyticsData();
    setAnalyticsData(data);
    
    // Refresh data every 10 seconds
    const interval = setInterval(() => {
      const refreshedData = getAnalyticsData();
      setAnalyticsData(refreshedData);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
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
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Button variant="outline" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </Button>
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
