import React, { createContext, useContext, useState, useEffect } from 'react';

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

// Mock API data
const mockProperties = [
  {
    id: 1,
    name: "Modern Downtown Apartment",
    type: "apartment",
    location: "New York, NY",
    price: 450000,
    description: "Beautiful modern apartment in the heart of downtown with stunning city views.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    bedrooms: 2,
    bathrooms: 2,
    size: "1200 sq ft"
  },
  {
    id: 2,
    name: "Suburban Family House",
    type: "house",
    location: "Austin, TX",
    price: 350000,
    description: "Spacious family home with large backyard and excellent school district.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop",
    coordinates: { lat: 30.2672, lng: -97.7431 },
    bedrooms: 4,
    bathrooms: 3,
    size: "2400 sq ft"
  },
  {
    id: 3,
    name: "Luxury Penthouse",
    type: "condo",
    location: "Miami, FL",
    price: 1200000,
    description: "Stunning penthouse with panoramic ocean views and premium amenities.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    bedrooms: 3,
    bathrooms: 3,
    size: "2000 sq ft"
  },
  {
    id: 4,
    name: "Cozy Studio Loft",
    type: "apartment",
    location: "San Francisco, CA",
    price: 280000,
    description: "Charming studio loft in trendy neighborhood with exposed brick walls.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    bedrooms: 1,
    bathrooms: 1,
    size: "600 sq ft"
  },
  {
    id: 5,
    name: "Mountain View Villa",
    type: "house",
    location: "Denver, CO",
    price: 650000,
    description: "Luxurious villa with breathtaking mountain views and modern amenities.",
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=500&h=300&fit=crop",
    coordinates: { lat: 39.7392, lng: -104.9903 },
    bedrooms: 5,
    bathrooms: 4,
    size: "3200 sq ft"
  },
  {
    id: 6,
    name: "Beachfront Condo",
    type: "condo",
    location: "San Diego, CA",
    price: 750000,
    description: "Beautiful beachfront condo with direct beach access and sunset views.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop",
    coordinates: { lat: 32.7157, lng: -117.1611 },
    bedrooms: 2,
    bathrooms: 2,
    size: "1400 sq ft"
  }
];

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Simulate API fetch
  useEffect(() => {
    const fetchProperties = async () => {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
    };
    
    fetchProperties();
  }, []);

  // Filter properties based on type and search query
  useEffect(() => {
    let filtered = properties;

    if (selectedType !== 'all') {
      filtered = filtered.filter(property => property.type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  }, [properties, selectedType, searchQuery]);

  const addProperty = (newProperty) => {
    const property = {
      ...newProperty,
      id: properties.length + 1,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    };
    setProperties(prev => [...prev, property]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    properties,
    filteredProperties,
    selectedType,
    setSelectedType,
    searchQuery,
    setSearchQuery,
    addProperty,
    isDarkMode,
    toggleDarkMode
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};