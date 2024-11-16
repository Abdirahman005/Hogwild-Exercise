
import React, { useState } from 'react';

function HogForm({ onAddHog }) {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    greased: false,
    weight: '',
    highestMedal: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddHog({ ...formData, weight: parseFloat(formData.weight) });
    setFormData({
      name: '',
      specialty: '',
      greased: false,
      weight: '',
      highestMedal: '',
      image: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Hog</h3>
      
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="specialty"
        placeholder="Specialty"
        value={formData.specialty}
        onChange={handleChange}
        required
      />
      <input
        name="weight"
        type="number"
        placeholder="Weight"
        value={formData.weight}
        onChange={handleChange}
        required
      />
      <label>
        <input
          name="greased"
          type="checkbox"
          checked={formData.greased}
          onChange={handleChange}
        />
        Greased
      </label>
      <input
        name="highestMedal"
        placeholder="Highest Medal"
        value={formData.highestMedal}
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <button type="submit">Add Hog</button>
    </form>
  );
}

export default HogForm;
