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

/**
 * Fetches events from GitHub repository
 */
export async function fetchEvents(): Promise<Event[]> {
  console.log('Fetching events data');
  try {
    const response = await fetch(EVENTS_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }
    
    const data = await response.json();
    return data.events as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
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
  return fetchEvents();
} 