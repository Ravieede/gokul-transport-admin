import React, { useState, useEffect } from 'react';
import '../App.css';
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle
} from '../api';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    vehicleName: '',
    vehicleModel: '',
    vehicleNumber: '',
    vehicleRc: '',
    rcExpiry: '',
    insuranceNumber: '',
    insuranceExpiry: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await getVehicles();
      setVehicles(response);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateVehicle(editId, formData);
      } else {
        await addVehicle(formData);
      }
      resetForm();
      fetchVehicles();
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({
      vehicleName: '',
      vehicleModel: '',
      vehicleNumber: '',
      vehicleRc: '',
      rcExpiry: '',
      insuranceNumber: '',
      insuranceExpiry: ''
    });
  };

  const handleEdit = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    setEditId(vehicle.id);
    setFormData({
      vehicleName: vehicle.vehicleName || '',
      vehicleModel: vehicle.vehicleModel || '',
      vehicleNumber: vehicle.vehicleNumber || '',
      vehicleRc: vehicle.vehicleRc || '',
      rcExpiry: vehicle.rcExpiry || '',
      insuranceNumber: vehicle.insuranceNumber || '',
      insuranceExpiry: vehicle.insuranceExpiry || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (vehicleId) => {
    try {
      await deleteVehicle(vehicleId);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const getInitials = (vehicleName) => {
    if (typeof vehicleName !== 'string') return 'NA';
    return vehicleName
      .split(' ')
      .map((w) => w?.[0]?.toUpperCase() || '')
      .join('');
  };

  return (
    <div className="vehicles-container">
      <div className="vehicle-header">
        <h2>Vehicle Management</h2>
      </div>

      <div className="vehicle-toolbar">
        <input
          type="text"
          className="search-bar"
          placeholder="Search vehicles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-btn" onClick={() => setShowForm(true)}>
          Add New Vehicle
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className="vehicle-form">
              <h3 className="form-title">
                {editId ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h3>

              <div className="form-section">
                <label>Vehicle Name:</label>
                <input
                  type="text"
                  placeholder="Vehicle Name"
                  value={formData.vehicleName}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-section">
                <label>Vehicle Model:</label>
                <input
                  type="text"
                  placeholder="Vehicle Model"
                  value={formData.vehicleModel}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleModel: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-section">
                <label>Vehicle Number:</label>
                <input
                  type="text"
                  placeholder="Vehicle Number"
                  value={formData.vehicleNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleNumber: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-section">
                <label>Vehicle RC Number:</label>
                <input
                  type="text"
                  placeholder="RC Number"
                  value={formData.vehicleRc}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleRc: e.target.value })
                  }
                />
              </div>

              <div className="form-section">
                <label>RC Expiry Date:</label>
                <input
                  type="date"
                  value={formData.rcExpiry}
                  onChange={(e) =>
                    setFormData({ ...formData, rcExpiry: e.target.value })
                  }
                />
              </div>

              <div className="form-section">
                <label>Insurance Number:</label>
                <input
                  type="text"
                  placeholder="Insurance Number"
                  value={formData.insuranceNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      insuranceNumber: e.target.value
                    })
                  }
                />
              </div>

              <div className="form-section">
                <label>Insurance Expiry Date:</label>
                <input
                  type="date"
                  value={formData.insuranceExpiry}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      insuranceExpiry: e.target.value
                    })
                  }
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="add-btn">
                  {editId ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="vehicle-list">
        {vehicles
          .filter((v) =>
            v?.vehicleName?.toLowerCase().includes(search.toLowerCase())
          )
          .map((vehicle) => (
            <div className="vehicle-card" key={vehicle.id}>
              <div className="vehicle-avatar">
                {getInitials(vehicle?.vehicleName)}
              </div>
              <div className="vehicle-details">
                <b>Vehicle Name:</b>
                <div className="vehicle-name">
                  <b>{vehicle?.vehicleName || 'Unnamed'}</b>
                </div>
                <div><strong>Model:</strong> {vehicle?.vehicleModel || 'N/A'}</div>
                <div><strong>Number:</strong> {vehicle?.vehicleNumber || 'N/A'}</div>
                <div><strong>RC:</strong> {vehicle?.vehicleRc || 'N/A'} (Exp: {vehicle?.rcExpiry || 'N/A'})</div>
                <div><strong>Insurance:</strong> {vehicle?.insuranceNumber || 'N/A'} (Exp: {vehicle?.insuranceExpiry || 'N/A'})</div>
              </div>
              <div className="vehicle-actions">
                <button className="edit-btn" onClick={() => handleEdit(vehicle.id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(vehicle.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
