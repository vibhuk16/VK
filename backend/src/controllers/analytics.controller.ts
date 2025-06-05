import { Request, Response } from 'express';
import { Session, Event } from '../models/Analytics';

export const analyticsController = {
  // Record a new session
  async recordSession(req: Request, res: Response) {
    try {
      const session = new Session(req.body);
      await session.save();
      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ error: 'Error recording session' });
    }
  },

  // Record a new event
  async recordEvent(req: Request, res: Response) {
    try {
      const event = new Event(req.body);
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Error recording event' });
    }
  },

  // Get analytics data with date range filter
  async getAnalytics(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const dateFilter = {
        timestamp: {
          $gte: new Date(startDate as string),
          $lte: new Date(endDate as string)
        }
      };

      // Get sessions with country aggregation
      const sessions = await Session.find(dateFilter);
      const events = await Event.find(dateFilter);
      
      // Aggregate sessions by country
      const sessionsByCountry = await Session.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: '$geoLocation.countryName',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ]);

      const analytics = {
        totalPageViews: sessions.length,
        totalEvents: events.length,
        uniqueVisitors: new Set(sessions.map(s => s.sessionId)).size,
        sessionsByCountry: Object.fromEntries(
          sessionsByCountry.map(({ _id, count }) => [_id || 'Unknown', count])
        ),
        sessions,
        events
      };

      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching analytics data' });
    }
  },

  // Get aggregated daily statistics
  async getDailyStats(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const dateFilter = {
        timestamp: {
          $gte: new Date(startDate as string),
          $lte: new Date(endDate as string)
        }
      };

      const dailyStats = await Session.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: {
              year: { $year: '$timestamp' },
              month: { $month: '$timestamp' },
              day: { $dayOfMonth: '$timestamp' }
            },
            pageViews: { $sum: 1 },
            uniqueVisitors: { $addToSet: '$sessionId' },
            countries: { $addToSet: '$geoLocation.countryName' }
          }
        },
        {
          $project: {
            _id: 0,
            date: {
              $dateFromParts: {
                year: '$_id.year',
                month: '$_id.month',
                day: '$_id.day'
              }
            },
            pageViews: 1,
            uniqueVisitors: { $size: '$uniqueVisitors' },
            countries: { $size: '$countries' }
          }
        },
        { $sort: { date: 1 } }
      ]);

      res.json(dailyStats);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching daily statistics' });
    }
  }
}; 