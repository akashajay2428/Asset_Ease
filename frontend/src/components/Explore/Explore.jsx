import React, { useEffect } from 'react';
import './Explore.css';
import { useNavigate } from 'react-router-dom';

const events = [
  {
    url: "https://a.storyblok.com/f/188325/1920x1280/41e681c422/alexandre-pellaes-6vajp0pscx0-unsplash-1-1.jpg",
    id: 1,
    title: 'Annual Tech Conference'
  },
  {
    url: "https://todaysbride.ca/wp-content/uploads/2023/12/wedding-reception-with-large-floral-installations-hanging-from-ceiling-2.jpg",
    id: 2,
    title: 'Wedding Reception'
  },
  {
    url: "https://images.cnbctv18.com/wp-content/uploads/2019/09/music-1019x573.jpg",
    id: 3,
    title: 'Music Festival'
  },
  {
    url: "https://lovinglifeco.com/wp-content/uploads/2023/07/corporate-event.jpg",
    id: 4,
    title: 'Corporate Seminar'
  },
];

const EventCard = ({ event, onClick }) => {
  return (
    <div className="event-card" onClick={onClick}>
      <img src={event.url} alt={event.title} className="event-image" />
      <h3 className="event-title">{event.title}</h3>
    </div>
  );
};

const Explore = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cards = document.querySelectorAll('.event-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  return (
    <div className="explore-container" id="explore-container">
      <h2 className="explore-header">Explore Events</h2>
      <div className="event-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => navigate(`/details/${event.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Explore;
