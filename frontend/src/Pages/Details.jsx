import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Details.css';

// Example event data for demonstration purposes
const events = [
  {
    id: 1,
    title: 'Annual Tech Conference',
    description: 'A gathering of technology enthusiasts to share knowledge and network.',
    chairs: 200,
    decoration: 'Tech-inspired themes with modern aesthetics.',
    soundBar: 'High-quality Bose sound systems.',
    url: "https://a.storyblok.com/f/188325/1920x1280/41e681c422/alexandre-pellaes-6vajp0pscx0-unsplash-1-1.jpg",
    equipment: [
      'Microphones', 'Speakers and amplifiers', 'Laptops or computers', 
      'Stage lighting', 'Chairs', 'Carpets', 'DOM', 'Drones'
    ],
  },
  {
    id: 2,
    title: 'Wedding Reception',
    description: 'Celebrate a beautiful union with elegance and style.',
    chairs: 150,
    decoration: 'Romantic floral installations.',
    soundBar: 'Live band with surround sound speakers.',
    url: "https://todaysbride.ca/wp-content/uploads/2023/12/wedding-reception-with-large-floral-installations-hanging-from-ceiling-2.jpg",
    equipment: [
      'Floral arrangements', 'Tablecloths, drapes, and skirting', 
      'Ambient lighting', 'Speakers and amplifiers', 'Chairs', 'Carpets', 'Drones'
    ],
  },
  {
    id: 3,
    title: 'Music Festival',
    description: 'A vibrant music festival featuring popular bands and artists.',
    chairs: 500,
    decoration: 'Colorful stage backdrops and lights.',
    soundBar: 'Concert-grade audio setup.',
    url: "https://images.cnbctv18.com/wp-content/uploads/2019/09/music-1019x573.jpg",
    equipment: [
      'Speakers and amplifiers', 'Stage lights', 'Moving head lights', 
      'PA system', 'Chairs', 'Carpets', 'DOM', 'Drones'
    ],
  },
  {
    id: 4,
    title: 'Corporate Seminar',
    description: 'Professional seminar for industry leaders and innovators.',
    chairs: 300,
    decoration: 'Minimalistic corporate decor.',
    soundBar: 'Clear voice amplification system.',
    url: "https://lovinglifeco.com/wp-content/uploads/2023/07/corporate-event.jpg",
    equipment: [
      'Podiums or lecterns', 'Laptops or computers', 'HDMI or VGA connectors', 
      'Wi-Fi routers or access points', 'Chairs', 'Carpets', 'DOM', 'Drones'
    ],
  },
  // Add other events...
];

const allEquipment = {
  'Microphones': { description: 'Wired and wireless options.', price: 50 },
  'Speakers and amplifiers': { description: 'High-quality sound systems.', price: 150 },
  'Audio mixers': { description: 'Professional audio mixing equipment.', price: 200 },
  'PA system': { description: 'Public Address system.', price: 100 },
  'Laptops or computers': { description: 'For presentations or technical use.', price: 500 },
  'Stage lighting': { description: 'Spotlights and LED panels.', price: 200 },
  'Ambient lighting': { description: 'Mood-enhancing lighting.', price: 150 },
  'Floral arrangements': { description: 'Beautiful flower decorations.', price: 100 },
  'Tablecloths, drapes, and skirting': { description: 'Elegant table decor.', price: 30 },
  'Moving head lights': { description: 'Dynamic stage lighting.', price: 250 },
  'Podiums or lecterns': { description: 'Stylish podiums for speakers.', price: 300 },
  'Wi-Fi routers or access points': { description: 'High-speed internet connectivity.', price: 50 },
  'HDMI or VGA connectors': { description: 'Reliable video connectors.', price: 15 },
  'Chairs': { description: 'Comfortable seating options for guests.', price: 20 },
  'Carpets': { description: 'High-quality carpets for decoration and comfort.', price: 40 },
  'DOM': { description: 'Digital Object Management for interactive presentations.', price: 500 },
  'Drones': { description: 'Drones for capturing aerial event footage.', price: 800 },
};

const Details = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((event) => event.id === parseInt(id));

  if (!event) {
    return <div>Event not found</div>;
  }

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="details-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h1 className="details-title">{event.title}</h1>
      <img src={event.url} alt={event.title} className="details-image" />
      <p className="details-description">{event.description}</p>
      <ul className="details-info">
        <li><strong>Number of Chairs:</strong> {event.chairs}</li>
        <li><strong>Decoration:</strong> {event.decoration}</li>
        <li><strong>Sound Bar:</strong> {event.soundBar}</li>
      </ul>

      <h2>Available Equipment</h2>
      <div className="equipment-grid">
        {event.equipment.map((equipmentName) => {
          const equipment = allEquipment[equipmentName];

          if (!equipment) {
            console.warn(`Missing equipment details for: ${equipmentName}`);
            return (
              <div key={equipmentName} className="equipment-card">
                <h3>{equipmentName}</h3>
                <p>Description not available</p>
                <p><strong>Price:</strong> N/A</p>
              </div>
            );
          }

          return (
            <div key={equipmentName} className="equipment-card">
              <h3>{equipmentName}</h3>
              <p>{equipment.description}</p>
              <p><strong>Price:</strong> ${equipment.price}</p>
              <button onClick={() => addToCart({ name: equipmentName, price: equipment.price })}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
      <button className="navigate-to-cart-button" onClick={() => navigate('/cart')}>
        Go to Cart
      </button>
    </div>
  );
};

export default Details;
