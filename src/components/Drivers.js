// src/components/Drivers.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import { getDrivers, addDriver, updateDriver, deleteDriver } from '../api';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    vehiclenumber: '',
    account: '',
    aadhar: '',
    location: ''
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await getDrivers();
      setDrivers(response);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedDriver) {
        await updateDriver(selectedDriver.id, formData);
      } else {
        await addDriver(formData);
      }
      setShowForm(false);
      setSelectedDriver(null);
      setFormData({
        name: '',
        mobile: '',
        vehiclenumber: '',
        account: '',
        aadhar: '',
        location: ''
      });
      fetchDrivers();
    } catch (error) {
      console.error('Error saving driver:', error);
    }
  };

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
    setFormData(driver);
    setShowForm(true);
  };

  const handleDelete = async (driver) => {
    try {
      await deleteDriver(driver.id);
      fetchDrivers();
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  const getInitials = (name) => {
    if (typeof name !== 'string') return 'NA';
    const words = name.trim().split(' ');
    return words.map(w => w?.[0]?.toUpperCase() || '').join('');
  };

  return (
    <div className="drivers-container">
      <div className="driver-header">
        <h2>Drivers Management</h2>
      </div>

      <div className="driver-toolbar">
        <input
          type="text"
          className="search-bar"
          placeholder="Search drivers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-btn" onClick={() => {
          setSelectedDriver(null);
          setFormData({
            name: '',
            mobile: '',
            vehiclenumber: '',
            account: '',
            aadhar: '',
            location: ''
          });
          setShowForm(true);
        }}>
          Add New Driver
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className="driver-form">
              <h3 className="form-title">{selectedDriver ? 'Edit Driver' : 'Add New Driver'}</h3>

              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  pattern="^[A-Za-z\s]+$"
                  title="Only letters allowed"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile:</label>
                <input
                  type="text"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  pattern="^\d{10}$"
                  title="Enter a 10-digit mobile number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Vehicle Number:</label>
                <input
                  type="text"
                  placeholder="Vehicle Number"
                  value={formData.vehiclenumber}
                  onChange={(e) => setFormData({ ...formData, vehiclenumber: e.target.value })}
                  pattern="^[A-Za-z0-9\s\-]+$"
                  title="Letters and numbers allowed"
                />
              </div>

              <div className="form-group">
                <label>Bank Account:</label>
                <input
                  type="text"
                  placeholder="Bank Account"
                  value={formData.account}
                  onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                  pattern="^\d+$"
                  title="Only digits allowed"
                />
              </div>

              <div className="form-group">
                <label>Aadhar:</label>
                <input
                  type="text"
                  placeholder="Aadhar"
                  value={formData.aadhar}
                  onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
                  pattern="^\d{12}$"
                  title="Enter a 12-digit Aadhar number"
                />
              </div>

              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  pattern="^[A-Za-z\s]+$"
                  title="Only letters allowed"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="add-btn">
                  {selectedDriver ? 'Update Driver' : 'Add Driver'}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedDriver(null);
                    setFormData({
                      name: '',
                      mobile: '',
                      vehiclenumber: '',
                      account: '',
                      aadhar: '',
                      location: ''
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="driver-list">
        {drivers
          .filter(d => d?.name?.toLowerCase().includes(search.toLowerCase()))
          .map((driver) => (
            <div className="driver-card" key={driver.id}>
              <div className="driver-avatar">{getInitials(driver?.name)}</div>
              <div className="driver-details">
                <b>Name:</b> <div className="driver-name">{driver?.name || 'Unnamed'}</div>
                <div><strong>Mobile:</strong> {driver?.mobile || 'N/A'}</div>
                <div><strong>Vehicle No:</strong> {driver?.vehiclenumber || 'N/A'}</div>
                <div><strong>Bank A/C:</strong> {driver?.account || 'N/A'}</div>
                <div><strong>Aadhar:</strong> {driver?.aadhar || 'N/A'}</div>
                <div><strong>Location:</strong> {driver?.location || 'N/A'}</div>
              </div>
              <div className="driver-actions">
                <button className="edit-btn" onClick={() => handleEdit(driver)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(driver)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
