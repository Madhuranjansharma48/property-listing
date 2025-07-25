
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

const PropertyCard = ({ property, onViewDetails }) => {
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-20 object-cover"
        />
        <Badge className={`absolute top-2 right-2 ${getTypeColor(property.type)}`}>
          {property.type}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{property.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {property.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="text-2xl font-bold text-primary mb-2">
          {formatPrice(property.price)}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {property.bedrooms}
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {property.bathrooms}
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            {property.size}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {property.description}
        </p>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={() => onViewDetails(property)}
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
