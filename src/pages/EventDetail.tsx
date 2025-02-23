import { useSearchParams, Link } from 'react-router-dom';
import eventsData from '@/data/events.json';
import { ArrowLeft } from 'lucide-react';

export default function EventDetail() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  const event = eventsData.events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/events"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
            Event not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/events"
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>

        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            {event.title}
          </h1>

          <span className={`px-3 py-1 rounded-full text-sm inline-block mb-4 ${
            event.category === 'tech' 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
              : event.category === 'gaming'
              ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100'
              : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
          }`}>
            {event.category === 'tech' ? 'Technical' : 
             event.category === 'non-tech' ? 'Non Technical' : 'Gaming'}
          </span>

          <p className="text-neutral-600 dark:text-neutral-300 mb-6">
            {event.description}
          </p>

          {event.rules && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                Rules
              </h2>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                {event.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {event.venue && event.datetime && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                Event Details
              </h2>
              <div className="space-y-2 text-neutral-600 dark:text-neutral-300">
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Date & Time:</strong> {new Date(event.datetime).toLocaleString()}</p>
                <p><strong>Team Size:</strong> {event.teamSize}</p>
              </div>
            </div>
          )}

          {event.enrollLink && (
            <a
              href={event.enrollLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Register Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 