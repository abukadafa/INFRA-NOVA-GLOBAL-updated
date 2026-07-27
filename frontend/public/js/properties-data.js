const propertiesData = [
  {
    id: "obsidian-villas",
    title: "The Obsidian Villas",
    location: "Banana Island, Lagos",
    city: "Lagos",
    type: "residential",
    status: "for-sale",
    price: 850000000,
    priceFormatted: "₦850,000,000",
    beds: 5,
    baths: 6,
    area: 720,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80"
    ],
    description: "The Obsidian Villas represent the absolute pinnacle of luxury waterfront living in Lagos. Located in the exclusive enclave of Banana Island, this masterpiece features striking contemporary architecture, double-height ceilings, and expansive floor-to-ceiling glass windows that look out onto the Lagos Lagoon.\n\nEvery detail of this 5-bedroom villa has been engineered to international standards. Built with premium travertine marble and custom woodwork, it includes a state-of-the-art smart home automation system that controls lighting, climate, security, and multi-room audio at the touch of a screen.\n\nThe private master wing features an open terrace, an oversized walk-in closet, and a spa-like bathroom. Perfect for entertaining, the outdoor deck boasts a heated infinity swimming pool, a fully equipped barbecue station, and a private dock for direct lagoon access.",
    amenities: ["Ocean/Lagoon View", "Waterfront Dock", "Infinity Pool", "Smart Home Automation", "Private Cinema", "Elevator", "24/7 Security & Power", "3-Car Garage"],
    specs: {
      "Property Type": "Waterfront Detached Villa",
      "Title Status": "Certificate of Occupancy (C of O)",
      "Furnishing": "Semi-Furnished (Fully Fitted Kitchen & Closets)",
      "Land Area": "950 m²",
      "Built Area": "720 m²",
      "Year Built": "2026",
      "Developer": "Infranova Global"
    }
  },
  {
    id: "meridian-court",
    title: "Meridian Court Apartments",
    location: "Guzape, Abuja",
    city: "Abuja",
    type: "residential",
    status: "featured",
    price: 180000000,
    priceFormatted: "₦180,000,000",
    beds: 3,
    baths: 4,
    area: 240,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1545466835-752157521fa9?w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?w=1200&q=80"
    ],
    description: "Positioned in the serene and rapidly appreciating hills of Guzape, Abuja, Meridian Court offers premium 3-bedroom apartments designed for modern professionals and families. With panoramic views of the city center, these residences combine security, accessibility, and high-end styling.\n\nEach apartment features an open-concept living space that flows into a custom Italian-fitted kitchen with integrated Bosch appliances. Large bedrooms come with built-in wardrobes and private en-suite bathrooms styled with premium sanitary ware.\n\nResidents enjoy a range of communal facilities including a fully equipped wellness gym, a central courtyard swimming pool, 24/7 backup power, water treatment, and around-the-clock security patrol with CCTV surveillance.",
    amenities: ["City Views", "Swimming Pool", "Fitness Center", "24/7 Backup Power", "Water Treatment System", "CCTV & Armed Guards", "Elevator Access", "Fitted Kitchen"],
    specs: {
      "Property Type": "Luxury Apartment",
      "Title Status": "FCDA Certificate of Occupancy",
      "Furnishing": "Fully Fitted (Kitchen & Bathrooms)",
      "Total Units": "12 Units",
      "Built Area": "240 m²",
      "Parking spaces": "2 per Apartment",
      "Year Built": "2025"
    }
  },
  {
    id: "nova-smart-estate",
    title: "Nova Smart Estate",
    location: "Epe, Lagos",
    city: "Epe",
    type: "land",
    status: "coming-soon",
    price: 2500000000,
    priceFormatted: "from ₦25,000,000",
    beds: null,
    baths: null,
    area: 450,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80"
    ],
    description: "Nova Smart Estate is Infranova Global's signature master-planned community in Epe, Lagos—the fastest growing tech and residential hub in West Africa. This eco-friendly smart city is designed to integrate nature, modern technology, and sustainable living.\n\nWe are offering pre-launch plots for residential and commercial development, with sizes starting from 450 m². The estate features underground cabling, high-speed fiber-optic internet, solar-powered street lighting, and a centralized biogas waste management system.\n\nInvesting in Nova Smart Estate guarantees high capital appreciation, driven by key proximity to the Lekki Deep Sea Port, the Alaro City tech zone, and the proposed Lekki International Airport. Secure your plot today with a flexible 12-month payment plan.",
    amenities: ["Smart Gated Entrance", "Underground Utility Cables", "Solar Street Lighting", "Paved Drainage & Roads", "24/7 CCTV & Security", "Community Green Park", "Water Hydrant System", "Commercial Hub"],
    specs: {
      "Property Type": "Serviced Plot of Land",
      "Title Status": "Registered Survey & C of O in Progress",
      "Plot Sizes": "450 m² & 600 m² Available",
      "Zoning": "Residential & Commercial",
      "Initial Deposit": "20%",
      "Payment Structure": "Up to 12 Months Installments",
      "Est. Gatehouse Delivery": "Q4 2026"
    }
  },
  {
    id: "infranova-business-tower",
    title: "Infranova Business Tower",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    type: "commercial",
    status: "for-sale",
    price: 1200000000,
    priceFormatted: "₦1,200,000,000",
    beds: null,
    baths: 12,
    area: 2100,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80"
    ],
    description: "The Infranova Business Tower is a newly delivered Grade-A office building positioned on a prime street in Victoria Island, Lagos. Spanning 5 levels of premium commercial space, it offers the perfect headquarters for multinational firms, financial institutions, or corporate conglomerates.\n\nThe tower is designed with energy-efficient curtain glass walls that flood the workspace with natural light while deflecting thermal heat. Inside, each floor offers an open-plan layout that can be fully customized for reception areas, executive suites, conference halls, and coworking spaces.\n\nFeatures include a dual lift system, underground parking for up to 30 vehicles, dedicated space for industrial generators, water purification plant, fiber-optic internet infrastructure, and advanced building management systems (BMS) for climate and access control.",
    amenities: ["Grade-A Workspace", "Victoria Island Location", "Underground Parking (30 Cars)", "Dual High-Speed Lifts", "Central HVAC System", "Fiber-optic Internet Ready", "24/7 Security Patrol", "Industrial Generator Room"],
    specs: {
      "Property Type": "Grade-A Commercial Building",
      "Title Status": "Lagos State Certificate of Occupancy",
      "Total Floor Area": "2,100 m²",
      "Number of Floors": "5 Floors",
      "Year Completed": "2025",
      "Current Occupancy": "60% Leased",
      "Estimated ROI": "9.5% Per Annum"
    }
  },
  {
    id: "sapphire-heights",
    title: "Sapphire Heights Penthouses",
    location: "Ikoyi, Lagos",
    city: "Lagos",
    type: "residential",
    status: "for-sale",
    price: 550000000,
    priceFormatted: "₦550,000,000",
    beds: 4,
    baths: 5,
    area: 410,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80"
    ],
    description: "Suspended in the sky above Ikoyi, Sapphire Heights features a collection of double-story penthouses that redefine urban elegance. Designed by award-winning architects, these residences provide private elevator access that opens directly into your private foyer.\n\nThe penthouse boasts an expansive open-plan lounge, formal dining room, and family living room. The state-of-the-art kitchen features integrated Miele appliances, quartz countertops, and a chef's pantry.\n\nStep outside onto your private wrap-around terrace, featuring a plunge pool and dining deck overlooking the Ikoyi skyline and the lagoon. A resident-only clubhouse, indoor gym, squash courts, and concierge desk ensure that all requests are taken care of seamlessly.",
    amenities: ["Private Elevator Access", "Plunge Pool on Balcony", "Wrap-around Terrace", "Concierge Service", "Residents Clubhouse", "Fully Fitted Kitchen", "Indoor Squash Court", "Panoramic Views"],
    specs: {
      "Property Type": "Luxury Duplex Penthouse",
      "Title Status": "Deed of Sublease & C of O",
      "Furnishing": "Partially Furnished (Smart Appliances)",
      "Built Area": "410 m²",
      "Parking spaces": "3 Dedicated",
      "Year Built": "2026",
      "Facility Management": "Infranova Facilities"
    }
  },
  {
    id: "grande-condominiums",
    title: "The Grande Condominiums",
    location: "Maitama, Abuja",
    city: "Abuja",
    type: "residential",
    status: "for-sale",
    price: 320000000,
    priceFormatted: "₦320,000,000",
    beds: 3,
    baths: 4,
    area: 300,
    images: [
      "https://images.unsplash.com/photo-1545466835-752157521fa9?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80"
    ],
    description: "Located in the highly sought-after Maitama neighborhood of Abuja, The Grande Condominiums deliver premium architectural layout and serene residential comfort. This 3-bedroom smart townhome is built with high ceilings, large windows, and a warm, organic color palette.\n\nFrom the smart lock entryway to the automated curtain systems and climate controls, convenience is built into every room. The master bedroom suite occupies an entire half-floor, complete with a private lounge, luxury dressing room, and wet-room style ensuite bath.\n\nThe gated estate offers landscaped gardens, a secure playground for children, a shared swimming pool, and underground electricity distribution.",
    amenities: ["Maitama Location", "Smart Lock & Lighting", "Kids Playground", "Shared Pool & Gardens", "Private Study Room", "Automated Curtains Ready", "24/7 Security Guards", "Underground Electricity"],
    specs: {
      "Property Type": "Smart Semi-Detached Townhouse",
      "Title Status": "FCDA C of O (Allocation)",
      "Furnishing": "Kitchen & Closet Fitted",
      "Built Area": "300 m²",
      "Parking Spaces": "2 Cars",
      "Developer": "Infranova Global",
      "Year Completed": "2025"
    }
  },
  {
    id: "eden-grove",
    title: "Eden Grove Residential",
    location: "GRA Ikeja, Lagos",
    city: "Lagos",
    type: "residential",
    status: "for-rent",
    price: 15000000,
    priceFormatted: "₦15,000,000 / year",
    beds: 4,
    baths: 4,
    area: 350,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
    ],
    description: "Eden Grove offers fully serviced, secure rental townhouses in the secure suburbs of GRA Ikeja, Lagos. This fully renovated 4-bedroom terrace house is ideal for families, expatriates, or executives seeking a quiet oasis in the Lagos mainland.\n\nThe property features a large private garden, a spacious living area, and a semi-detached staff quarters (BQ). All bedrooms are en-suite and fitted with energy-efficient air conditioners.\n\nRental fees cover full facility management including security, garden maintenance, refuse collection, water treatment, and daily access to backup electricity.",
    amenities: ["GRA Ikeja Security", "Private Back Garden", "Serviced Power & Utilities", "Boys Quarters (1 Room)", "Shared Gym", "Dedicated CCTV", "Water Purification", "Refuse Disposal"],
    specs: {
      "Property Type": "Serviced Terrace Duplex",
      "Lease Terms": "Minimum 1 Year, Renewable",
      "Service Charge": "₦2,500,000 per Annum (Includes Power)",
      "Built Area": "350 m²",
      "Furnishing": "Unfurnished (Fitted ACs & Kitchen)",
      "BQ Included": "Yes (1 Room En-suite)"
    }
  },
  {
    id: "zenith-plaza",
    title: "Zenith Office Suites",
    location: "Lekki Phase 1, Lagos",
    city: "Lagos",
    type: "commercial",
    status: "for-rent",
    price: 8000000,
    priceFormatted: "₦8,000,000 / year",
    beds: null,
    baths: 2,
    area: 120,
    images: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
    ],
    description: "Positioned in the prime commercial sector of Lekki Phase 1, Zenith Plaza offers a premium 120 m² office suite designed for modern startups, consulting agencies, or corporate branches. This open-concept space provides high visibility and excellent foot traffic.\n\nThe suite features modern tiling, a private reception lobby, a private kitchenette, and two private executive washrooms. Pre-wired for high-speed fiber-optic internet and central climate systems, the space is ready for quick setup.\n\nThe commercial plaza provides security guards, a front-desk receptionist desk, a shared meeting room, passenger lifts, and dedicated parking allocations for tenants and visitors.",
    amenities: ["Lekki Phase 1 Location", "24/7 Security & CCTV", "Private Kitchenette", "Central AC Provision", "Fiber Internet Pre-installed", "Shared Meeting Boardroom", "Visitor Parking Slots", "Backup Gen"],
    specs: {
      "Property Type": "Commercial Office Space",
      "Lease Terms": "Minimum 2 Years Preferred",
      "Service Charge": "₦1,200,000 per Annum",
      "Total Floor Area": "120 m²",
      "Floor Level": "2nd Floor",
      "Parking slots": "3 Allocated"
    }
  }
];

// Export standard for browser load
if (typeof module !== "undefined" && module.exports) {
  module.exports = propertiesData;
}
