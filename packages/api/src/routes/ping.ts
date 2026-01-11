import factory from '#utils/factory';

const LOCATION_MAP: Record<string, { city: string; timezone: string }> = {
  // Europe
  LHR: { city: 'London', timezone: 'Europe/London' },
  AMS: { city: 'Amsterdam', timezone: 'Europe/Amsterdam' },
  FRA: { city: 'Frankfurt', timezone: 'Europe/Berlin' },
  CDG: { city: 'Paris', timezone: 'Europe/Paris' },
  DUB: { city: 'Dublin', timezone: 'Europe/Dublin' },

  // North America
  IAD: { city: 'Ashburn, VA', timezone: 'America/New_York' },
  JFK: { city: 'New York, NY', timezone: 'America/New_York' },
  ORD: { city: 'Chicago, IL', timezone: 'America/Chicago' },
  LAX: { city: 'Los Angeles, CA', timezone: 'America/Los_Angeles' },
  SFO: { city: 'San Francisco, CA', timezone: 'America/Los_Angeles' },
  DFW: { city: 'Dallas, TX', timezone: 'America/Chicago' },

  // Asia/Pacific
  NRT: { city: 'Tokyo', timezone: 'Asia/Tokyo' },
  SIN: { city: 'Singapore', timezone: 'Asia/Singapore' },
  SYD: { city: 'Sydney', timezone: 'Australia/Sydney' }
};

const ping = factory.createApp().get('/', async (c) => {
  const colo: string = typeof c.req.raw.cf?.colo === 'string' ? c.req.raw.cf?.colo : 'N/A';

  const locationDetails = LOCATION_MAP[colo] || {
    city: 'Unknown',
    timezone: 'UTC'
  };

  const serverTime = new Date().toLocaleString('en-US', {
    timeZone: locationDetails.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return c.json({
    success: true,
    meta: {
      city: locationDetails.city,
      colo: colo,
      serverTime: serverTime
    }
  });
});

export default ping;
