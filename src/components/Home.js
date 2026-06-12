import React, { useState, useEffect } from 'react';
import '../App.css';
import { updateDriver } from '../api';

const vehicleImages = [
  '/images/bulker-tanker.png',
  '/images/lorry2.png',
  '/images/lorry3.png',
  '/images/buses.png',
  '/images/buses1.png',
  '/images/Vans.png',
  '/images/Vans1.png',
  '/images/Cars.png',
  '/images/Cars2.png',
  '/images/Cars3.png',
  '/images/thar.png',
  '/images/bullet.png',
  '/images/bullet1.png',
  '/images/Ns200.png',
  '/images/duke.png',
];

export default function Home({ drivers = [], vehicles = [] }) {
  const [editDriver, setEditDriver] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    mobile: '',
    vehiclenumber: '',
    vehicleName: '',
    source: '',
    destination: '',
    mode: '',
    time: ''
  });
  const [filteredDrivers, setFilteredDrivers] = useState(drivers);

  // Auto-fill vehicle name when vehicle number changes
  useEffect(() => {
    const matchedVehicle = vehicles.find(v =>
      v.vehicleNumber?.replace(/\s+/g, '').toLowerCase() ===
      editFormData.vehiclenumber?.replace(/\s+/g, '').toLowerCase()
    );
    if (matchedVehicle) {
      setEditFormData(prev => ({ ...prev, vehicleName: matchedVehicle.vehicleName }));
    }
  }, [editFormData.vehiclenumber, vehicles]);

  const dutyCards = filteredDrivers.map((driver, idx) => {
    const vehicle = vehicles.find(v =>
      v.vehicleNumber?.replace(/\s+/g, '').toLowerCase() ===
      driver.vehiclenumber?.replace(/\s+/g, '').toLowerCase()
    );

    const mode = driver.vehiclenumber?.trim() ? 'On Duty' : 'Available';

    return {
      id: driver.id,
      driverName: driver.name,
      mobile: driver.mobile,
      vehicleNumber: driver.vehiclenumber || 'Not Assigned',
      vehicleName: vehicle?.vehicleName || 'Unknown',
      source: driver.location || 'Unknown',
      destination: 'Client Location',
      mode,
      time: '10:00 AM',
      image: vehicleImages[idx % vehicleImages.length]
    };
  });

  return (
    <div className="home-container">
      <div className="scroll-text">
  Welcome to Gokul Transport
</div>

      {/* Vehicle Image Slider */}
      <div className="slider-wrapper">
        <div className="slider-track">
          {vehicleImages.map((src, idx) => (
            <div className="vehicle-card" key={idx}>
              <img src={src} alt={`vehicle-${idx}`} className="vehicle-image" />
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Drivers..."
          onChange={(e) => {
            const query = e.target.value.toLowerCase();
            const filtered = drivers.filter(driver =>
              driver.name.toLowerCase().includes(query)
            );
            setFilteredDrivers(filtered);
          }}
        />
      </div>

      {/* Driver Cards */}
      <div className="driver-card-section">
        {dutyCards.map((card, idx) => (
          <div className="driver-card" key={idx}>
            <h4>🚹 Driver Card</h4>
            <p><strong>Name:</strong> {card.driverName}</p>
            <p><strong>Mobile:</strong> {card.mobile}</p>
            <p><strong>Vehicle Number:</strong> {card.vehicleNumber}</p>
            <p><strong>Vehicle Name:</strong> {card.vehicleName}</p>
            <p><strong>Source:</strong> {card.source}</p>
            <p><strong>Destination:</strong> {card.destination}</p>
            <p><strong>Mode:</strong> <span className={`mode-badge ${card.mode.toLowerCase()}`}>{card.mode}</span></p>
            <p><strong>Time:</strong> {card.time}</p>
            <button
              className="track-btn"
              onClick={() => {
                const origin = encodeURIComponent(card.source);
                const destination = encodeURIComponent(card.destination);
                window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`, '_blank');
              }}
            >
              🗺️ Open Map
            </button>
            <button
              className="edit-btn"
              onClick={() => {
                setEditDriver(card);
                setEditFormData({
                  name: card.driverName,
                  mobile: card.mobile,
                  vehiclenumber: card.vehicleNumber,
                  vehicleName: card.vehicleName,
                  source: card.source,
                  destination: card.destination,
                  mode: card.mode,
                  time: card.time
                });
              }}
            >
              ✏️ Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editDriver && (
        <div className="modal-overlay" onClick={() => setEditDriver(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await updateDriver(editDriver.id, editFormData);
                  setEditDriver(null);
                  window.location.reload();
                } catch (error) {
                  console.error('Error updating driver:', error);
                }
              }}
              className="driver-form"
            >
              <h3 className="form-title">Edit Driver</h3>

              {[
                { label: 'Name', key: 'name' },
                { label: 'Mobile', key: 'mobile' },
                { label: 'Vehicle Number', key: 'vehiclenumber' },
                { label: 'Vehicle Name', key: 'vehicleName' },
                { label: 'Source', key: 'source' },
                { label: 'Destination', key: 'destination' },
                { label: 'Mode', key: 'mode' },
                { label: 'Time', key: 'time' }
              ].map(({ label, key, type = 'text' }) => (
                <div className="form-section" key={key}>
                  <label>{label}:</label>
                  <input
                    type={type}
                    value={editFormData[key]}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, [key]: e.target.value })
                    }
                    required={['name', 'mobile', 'vehiclenumber'].includes(key)}
                  />
                </div>
              ))}

              <div className="form-actions">
                <button type="submit" className="add-btn">Update</button>
                <button type="button" className="cancel-btn" onClick={() => setEditDriver(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
