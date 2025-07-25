import React, { useState } from 'react';
import { PropertyProvider, useProperty } from '../context/PropertyContext';
import Header from '../components/Header';
import PropertyFilters from '../components/PropertyFilters';
import PropertyCard from '../components/PropertyCard';
import AddPropertyForm from '../components/AddPropertyForm';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';

const PropertyDashboard = () => {
  const { filteredProperties, properties } = useProperty();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  if (properties.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading properties...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Add Property Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Property Listings</h2>
            <p className="text-muted-foreground">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {showAddForm ? 'Hide Form' : 'Add Property'}
          </Button>
        </div>

        {/* Add Property Form */}
        {showAddForm && <AddPropertyForm />}

        {/* Filters */}
        <PropertyFilters />

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Property Details Modal */}
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <PropertyProvider>
      <PropertyDashboard />
    </PropertyProvider>
  );
};

export default Index;
