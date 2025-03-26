/**
 * Service for fetching events data from GitHub repository
 */

// Define event interface based on the structure in the JSON
interface EventGalleryItem {
  url: string;
  caption: string;
}

interface EventSchedule {
  [key: string]: string;
}

interface EventContact {
  [key: string]: string;
}

export interface Event {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  enrollLink: string;
  rules: string[];
  venue: string;
  datetime: string;
  teamSize: string;
  closed: boolean;
  fee?: string;
  prizePool?: string;
  schedule?: EventSchedule;
  contact?: EventContact;
  gallery?: EventGalleryItem[];
}

const EVENTS_ENDPOINT = 'https://raw.githubusercontent.com/Pranav-Talmale/techfest-2025-frontend/refs/heads/main/src/data/events.json';

// Cache variables
let cachedEvents: Event[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches events from GitHub repository with caching
 */
export async function fetchEvents(): Promise<Event[]> {
  const now = Date.now();
  
  // Return cached data if it's fresh
  if (cachedEvents && now - lastFetchTime < CACHE_DURATION) {
    console.log('Using cached events data');
    return cachedEvents;
  }
  
  try {
    console.log('Fetching fresh events data');
    const response = await fetch(EVENTS_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }
    
    const data = await response.json();
    cachedEvents = data.events as Event[];
    lastFetchTime = now;
    
    return cachedEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    
    // If we have stale cache, use it rather than nothing
    if (cachedEvents) {
      console.log('Using stale cached data as fallback');
      return cachedEvents;
    }
    
    // If all else fails, return empty array
    return [];
  }
}

/**
 * Fetches a single event by ID
 */
export async function fetchEventById(eventId: string): Promise<Event | null> {
  try {
    const events = await fetchEvents();
    return events.find(event => event.id === eventId) || null;
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    return null;
  }
}

/**
 * Force refresh the events cache
 */
export async function refreshEventsCache(): Promise<Event[]> {
  // Set lastFetchTime to 0 to force a refresh
  lastFetchTime = 0;
  return fetchEvents();
} 