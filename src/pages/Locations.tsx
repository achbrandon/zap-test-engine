import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import Map from "@/components/Map";

interface Location {
  id: number;
  name: string;
  type: "branch" | "atm";
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  hours?: string;
  lat: number;
  lng: number;
}

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "branch" | "atm">("all");

  // Random ATM and branch locations across major US cities
  const locations: Location[] = [
    {
      id: 1,
      name: "VaultBank Downtown Branch",
      type: "branch",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      phone: "(212) 555-0100",
      hours: "Mon-Fri 9AM-5PM, Sat 10AM-2PM",
      lat: 40.7589,
      lng: -73.9851
    },
    {
      id: 2,
      name: "Broadway ATM",
      type: "atm",
      address: "456 Broadway",
      city: "New York",
      state: "NY",
      zip: "10013",
      hours: "24/7",
      lat: 40.7205,
      lng: -74.0009
    },
    {
      id: 3,
      name: "VaultBank LA Branch",
      type: "branch",
      address: "789 Sunset Blvd",
      city: "Los Angeles",
      state: "CA",
      zip: "90028",
      phone: "(323) 555-0200",
      hours: "Mon-Fri 9AM-5PM, Sat 10AM-2PM",
      lat: 34.0979,
      lng: -118.3298
    },
    {
      id: 4,
      name: "Hollywood ATM",
      type: "atm",
      address: "321 Hollywood Blvd",
      city: "Los Angeles",
      state: "CA",
      zip: "90028",
      hours: "24/7",
      lat: 34.1016,
      lng: -118.3267
    },
    {
      id: 5,
      name: "VaultBank Chicago Branch",
      type: "branch",
      address: "555 Michigan Ave",
      city: "Chicago",
      state: "IL",
      zip: "60611",
      phone: "(312) 555-0300",
      hours: "Mon-Fri 9AM-5PM, Sat 10AM-2PM",
      lat: 41.8902,
      lng: -87.6248
    },
    {
      id: 6,
      name: "Loop ATM",
      type: "atm",
      address: "888 State Street",
      city: "Chicago",
      state: "IL",
      zip: "60605",
      hours: "24/7",
      lat: 41.8781,
      lng: -87.6298
    },
    {
      id: 7,
      name: "VaultBank Miami Branch",
      type: "branch",
      address: "999 Ocean Drive",
      city: "Miami",
      state: "FL",
      zip: "33139",
      phone: "(305) 555-0400",
      hours: "Mon-Fri 9AM-5PM, Sat 10AM-2PM",
      lat: 25.7807,
      lng: -80.1300
    },
    {
      id: 8,
      name: "South Beach ATM",
      type: "atm",
      address: "111 Collins Ave",
      city: "Miami",
      state: "FL",
      zip: "33139",
      hours: "24/7",
      lat: 25.7905,
      lng: -80.1396
    },
    {
      id: 9,
      name: "VaultBank Austin Branch",
      type: "branch",
      address: "222 Congress Ave",
      city: "Austin",
      state: "TX",
      zip: "78701",
      phone: "(512) 555-0500",
      hours: "Mon-Fri 9AM-5PM, Sat 10AM-2PM",
      lat: 30.2672,
      lng: -97.7431
    },
    {
      id: 10,
      name: "Downtown Austin ATM",
      type: "atm",
      address: "333 6th Street",
      city: "Austin",
      state: "TX",
      zip: "78701",
      hours: "24/7",
      lat: 30.2691,
      lng: -97.7421
    },
    {
      id: 11,
      name: "VaultBank Seattle Branch",
      type: "branch",
      address: "444 Pike Street",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      phone: "(206) 555-0600",
      hours: "Mon-Fri 9AM-5PM, Sat 10AM-2PM",
      lat: 47.6097,
      lng: -122.3331
    },
    {
      id: 12,
      name: "Capitol Hill ATM",
      type: "atm",
      address: "777 Broadway E",
      city: "Seattle",
      state: "WA",
      zip: "98102",
      hours: "24/7",
      lat: 47.6205,
      lng: -122.3231
    }
  ];

  const filteredLocations = locations.filter(location => {
    const matchesSearch = 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.zip.includes(searchQuery);
    
    const matchesFilter = filterType === "all" || location.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find VaultBank Locations</h1>
          <p className="text-xl opacity-90 mb-8">
            Locate branches and ATMs near you
          </p>
          
          {/* Search and Filter */}
          <div className="flex gap-4 flex-wrap">
            <Input
              type="text"
              placeholder="Search by city, state, or ZIP code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md bg-primary-foreground text-foreground"
            />
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "secondary" : "outline"}
                onClick={() => setFilterType("all")}
              >
                All Locations
              </Button>
              <Button
                variant={filterType === "branch" ? "secondary" : "outline"}
                onClick={() => setFilterType("branch")}
              >
                Branches
              </Button>
              <Button
                variant={filterType === "atm" ? "secondary" : "outline"}
                onClick={() => setFilterType("atm")}
              >
                ATMs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="lg:sticky lg:top-4 h-[600px]">
            <Card className="h-full overflow-hidden">
              <CardContent className="p-0 h-full">
                <Map locations={filteredLocations} />
              </CardContent>
            </Card>
          </div>

          {/* Location List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              {filteredLocations.length} Location{filteredLocations.length !== 1 ? 's' : ''} Found
            </h2>
            
            {filteredLocations.map((location) => (
              <Card key={location.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {location.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                          {location.type === "branch" ? "Branch" : "ATM"}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <Navigation className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p>{location.address}</p>
                      <p>{location.city}, {location.state} {location.zip}</p>
                    </div>
                  </div>
                  
                  {location.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${location.phone}`} className="hover:underline">
                        {location.phone}
                      </a>
                    </div>
                  )}
                  
                  {location.hours && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{location.hours}</span>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    asChild
                  >
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Directions
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
