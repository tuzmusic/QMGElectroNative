const mockInfo = {
  _job_description: [
    "This is a charging station. This section shows info about the charging station."
  ],
  _job_location: ["123 Fakeadress Lane, Some City, NW 12345"],
  _company_email: ["email@electro.com"],
  _company_phone: ["321-555-1212"]
};

export const indexResponse = [
  {
    id: "1",
    listing_props: {
      _job_title: ["Gavello Glen - free"],
      geolocation_lat: ["37.3598896"],
      geolocation_long: ["-122.019102"],
      _company_price_from: [""],
      _company_price_to: [""],
      ...mockInfo
    }
  },
  {
    id: "2",
    listing_props: {
      _job_title: ["De Anza Community College Transit Center"],
      _job_location: ["6969 Cool Street"],
      geolocation_lat: ["37.32246610000001"],
      geolocation_long: ["-122.0444706"],
      _company_price_from: ["$10"],
      _company_price_to: ["$50"],
      ...mockInfo
    }
  },
  {
    id: "3",
    listing_props: {
      _job_title: ["Google Headquarters"],
      _job_location: ["6969 Cool Street"],
      geolocation_lat: ["37.4219999"],
      geolocation_long: ["-122.0840575"],
      _company_price_from: ["$10"],
      _company_price_to: ["$50"],
      ...mockInfo
    }
  },
  {
    id: "4",
    listing_props: {
      _job_title: ["Steven's Creek"],
      _job_location: ["6969 Cool Street"],
      geolocation_lat: ["37.3043165"],
      geolocation_long: ["-122.072954"],
      _company_price_from: ["$10"],
      _company_price_to: ["$50"],
      ...mockInfo
    }
  }
];
