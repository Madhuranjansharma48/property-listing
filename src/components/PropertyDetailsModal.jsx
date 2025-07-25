import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PropertyDetailsModal = ({ property, isOpen, onClose }) => {
  if (!property) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'apartment': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'house': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'condo': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {property.name}
            <Badge className={getTypeColor(property.type)}>
              {property.type}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Property Image */}
          <div className="relative">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          {/* Price and Location */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">
              {formatPrice(property.price)}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {property.location}
            </div>
          </div>
          
          {/* Property Details */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Bed className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-semibold">{property.bedrooms}</div>
              <div className="text-sm text-muted-foreground">Bedrooms</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Bath className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-semibold">{property.bathrooms}</div>
              <div className="text-sm text-muted-foreground">Bathrooms</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Square className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-semibold">{property.size?.split(' ')[0]}</div>
              <div className="text-sm text-muted-foreground">sq ft</div>
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </div>
          
          {/* Google Maps Embed */}
          {property.coordinates && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Location</h3>
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dgsWVr_dlxCgXw&q=${property.coordinates.lat},${property.coordinates.lng}&zoom=15`}
                  className="rounded-lg"
                  title="Property Location"
                />
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button 
              className="flex-1"
              onClick={() => {
                // You could implement contact functionality here
                alert('Contact functionality would be implemented here');
              }}
            >
              Contact Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailsModal;