const mockInfo = {
  _job_description: [
    "This is a charging station. This section shows info about the charging station."
  ],
  _job_location: ["123 Fakeadress Lane, Some City, NW 12345"],
  _company_email: ["email@electro.com"],
  _company_phone: ["321-555-1212"]
};

export const mockIndexResponse = [
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

export const realIndexResponseJuly2019 = [
  {
    id: 1031,
    date: "2019-07-11T21:02:31",
    date_gmt: "2019-07-11T21:02:31",
    guid: {
      rendered: "https://joinelectro.com/listings/tesla-supercharger-2/"
    },
    modified: "2019-07-11T21:04:52",
    modified_gmt: "2019-07-11T21:04:52",
    slug: "tesla-supercharger-2",
    status: "publish",
    type: "job_listing",
    link: "https://joinelectro.com/listings/tesla-supercharger-2/",
    title: {
      rendered: "Tesla Supercharger"
    },
    content: {
      rendered: "<p>Visit us near Springfield Town Center!</p> ",
      protected: false
    },
    featured_media: 1032,
    comment_status: "open",
    ping_status: "closed",
    template: "",
    meta: {
      pmpro_default_level: 0
    },
    ["job-categories"]: [86],
    ["job-types"]: [],
    job_listing_amenity: [],
    job_listing_region: [],
    job_listing_tag: [],
    listing_props: {
      _filled: ["0"],
      _featured: ["0"],
      _submitting_key: ["5d27a3dfe8ed4"],
      _job_title: ["Tesla Supercharger"],
      _job_location: [""],
      _job_description: ["Visit us near Springfield Town Center!"],
      _job_tags: [""],
      _job_menu_prices: ["a:0:{}"],
      _company_website: ["http://www.whatever.com"],
      _company_tagline: [""],
      _company_video: [""],
      _company_twitter: ["twitter.com/123456"],
      _thumbnail_id: ["1032"],
      _company_price_range: ["moderate"],
      _company_price_from: [""],
      _company_price_to: [""],
      _company_phone: [""],
      _company_email: [""],
      _gallery_images: [""],
      _company_facebook: [""],
      _company_linkedin: [""],
      _company_instagram: [""],
      geolocation_lat: [""],
      geolocation_long: [""],
      _views_count: ["363"],
      _edit_lock: ["1562884760:1"],
      _job_expires: ["2019-08-10"],
      _edit_last: ["1"],
      _claimed: ["0"],
      _company_pinterest: [""],
      _job_layout_type: ["global"],
      _products: [""],
      slide_template: ["default"],
      ["pms-content-restrict-message-purchasing_restricted"]: [""],
      ["pms-content-restrict-custom-redirect-url"]: [""],
      ["pms-content-restrict-message-logged_out"]: [""],
      ["pms-content-restrict-message-non_members"]: [""],
      _listing_views_count: ["12"],
      ["pms-content-restrict-type"]: ["default"]
    },
    _links: {
      self: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/job-listings/1031"
        }
      ],
      collection: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/job-listings"
        }
      ],
      about: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/types/job_listing"
        }
      ],
      replies: [
        {
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/comments?post=1031"
        }
      ],
      wp_featuredmedia: [
        {
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/media/1032"
        }
      ],
      wp_attachment: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/media?parent=1031"
        }
      ],
      wp_term: [
        {
          taxonomy: "job_listing_category",
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/job-categories?post=1031"
        },
        {
          taxonomy: "job_listing_type",
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/job-types?post=1031"
        },
        {
          taxonomy: "job_listing_amenity",
          embeddable: true,
          href:
            "https://joinelectro.com/wp-json/wp/v2/job_listing_amenity?post=1031"
        },
        {
          taxonomy: "job_listing_region",
          embeddable: true,
          href:
            "https://joinelectro.com/wp-json/wp/v2/job_listing_region?post=1031"
        },
        {
          taxonomy: "job_listing_tag",
          embeddable: true,
          href:
            "https://joinelectro.com/wp-json/wp/v2/job_listing_tag?post=1031"
        }
      ],
      curies: [
        {
          name: "wp",
          href: "https://api.w.org/{rel}",
          templated: true
        }
      ]
    }
  },
  {
    id: 1029,
    date: "2019-07-11T20:58:34",
    date_gmt: "2019-07-11T20:58:34",
    guid: {
      rendered: "https://joinelectro.com/listings/tesla-supercharger/"
    },
    modified: "2019-07-11T21:07:31",
    modified_gmt: "2019-07-11T21:07:31",
    slug: "tesla-supercharger",
    status: "publish",
    type: "job_listing",
    link: "https://joinelectro.com/listings/tesla-supercharger/",
    title: {
      rendered: "Tesla Supercharger"
    },
    content: {
      rendered: "<p>We offer car charging services 7 days a week!</p> ",
      protected: false
    },
    featured_media: 1030,
    comment_status: "open",
    ping_status: "closed",
    template: "",
    meta: {
      pmpro_default_level: 0
    },
    ["job-categories"]: [86],
    ["job-types"]: [],
    job_listing_amenity: [],
    job_listing_region: [88],
    job_listing_tag: [],
    listing_props: {
      _filled: ["0"],
      _featured: ["0"],
      _submitting_key: ["5d27a2f0cedc6"],
      _job_title: ["Tesla Supercharger"],
      _job_location: ["Address: 24 Grand Corner Ave, Gaithersburg, MD 20878"],
      _job_description: ["We offer car charging services 7 days a week!"],
      _job_tags: [""],
      _job_menu_prices: ["a:0:{}"],
      _company_website: ["http://www.whatever.com"],
      _company_tagline: [""],
      _company_video: [""],
      _company_twitter: ["twitter.com/123456"],
      _thumbnail_id: ["1030"],
      _company_price_range: ["notsay"],
      _company_price_from: [""],
      _company_price_to: [""],
      _company_phone: [""],
      _company_email: [""],
      _gallery_images: [""],
      _company_facebook: [""],
      _company_linkedin: [""],
      _company_instagram: [""],
      geolocation_lat: [""],
      geolocation_long: [""],
      _job_expires: ["2019-08-10"],
      _listing_views_count: ["12"],
      _views_count: ["361"],
      _edit_lock: ["1562881426:1"],
      _edit_last: ["1"],
      _claimed: ["0"],
      _company_pinterest: [""],
      _job_layout_type: ["global"],
      _products: [""],
      slide_template: ["default"],
      ["pms-content-restrict-message-purchasing_restricted"]: [""],
      ["pms-content-restrict-custom-redirect-url"]: [""],
      ["pms-content-restrict-message-logged_out"]: [""],
      ["pms-content-restrict-message-non_members"]: [""],
      ["pms-content-restrict-type"]: ["default"]
    },
    _links: {
      self: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/job-listings/1029"
        }
      ],
      collection: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/job-listings"
        }
      ],
      about: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/types/job_listing"
        }
      ],
      replies: [
        {
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/comments?post=1029"
        }
      ],
      wp_featuredmedia: [
        {
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/media/1030"
        }
      ],
      wp_attachment: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/media?parent=1029"
        }
      ],
      wp_term: [
        {
          taxonomy: "job_listing_category",
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/job-categories?post=1029"
        },
        {
          taxonomy: "job_listing_type",
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/job-types?post=1029"
        },
        {
          taxonomy: "job_listing_amenity",
          embeddable: true,
          href:
            "https://joinelectro.com/wp-json/wp/v2/job_listing_amenity?post=1029"
        },
        {
          taxonomy: "job_listing_region",
          embeddable: true,
          href:
            "https://joinelectro.com/wp-json/wp/v2/job_listing_region?post=1029"
        },
        {
          taxonomy: "job_listing_tag",
          embeddable: true,
          href:
            "https://joinelectro.com/wp-json/wp/v2/job_listing_tag?post=1029"
        }
      ],
      curies: [
        {
          name: "wp",
          href: "https://api.w.org/{rel}",
          templated: true
        }
      ]
    }
  },
  {
    id: 1026,
    date: "2019-07-11T20:52:10",
    date_gmt: "2019-07-11T20:52:10",
    guid: {
      rendered: "https://joinelectro.com/listings/tesla-destination-charger/"
    },
    modified: "2019-07-11T21:08:12",
    modified_gmt: "2019-07-11T21:08:12",
    slug: "tesla-destination-charger",
    status: "publish",
    type: "job_listing",
    link: "https://joinelectro.com/listings/tesla-destination-charger/",
    title: {
      rendered: "Tesla Destination Charger"
    },
    content: {
      rendered: "<p>Charge your car at Tesla Destination Charger!</p> ",
      protected: false
    },
    featured_media: 1027,
    comment_status: "open",
    ping_status: "closed",
    template: "",
    meta: {
      pmpro_default_level: 0
    },
    ["job-categories"]: [86],
    ["job-types"]: [],
    job_listing_amenity: [],
    job_listing_region: [89],
    job_listing_tag: [],
    listing_props: {
      _filled: ["0"],
      _featured: ["0"],
      _submitting_key: ["5d27a16e75068"],
      _job_title: ["Tesla Destination Charger"],
      _job_location: ["1767 King St, Alexandria, VA 22314"],
      _job_description: ["Charge your car at Tesla Destination Charger!"],
      _job_tags: [""],
      _job_menu_prices: ["a:0:{}"],
      _company_website: ["http://www.whatever.com"],
      _company_tagline: [""],
      _company_video: [""],
      _company_twitter: ["twitter.com/123456"],
      _thumbnail_id: ["1027"],
      _company_price_range: ["notsay"],
      _company_price_from: [""],
      _company_price_to: [""],
      _company_phone: [""],
      _company_email: [""],
      _gallery_images: [""],
      _company_facebook: [""],
      _company_linkedin: [""],
      _company_instagram: [""],
      geolocation_lat: [""],
      geolocation_long: [""],
      _job_expires: ["2019-08-10"],
      _listing_views_count: ["15"],
      _views_count: ["359"],
      _edit_lock: ["1562879903:1"],
      _edit_last: ["1"],
      _claimed: ["0"],
      _company_pinterest: [""],
      _job_layout_type: ["global"],
      _products: [""],
      slide_template: ["default"],
      ["pms-content-restrict-message-purchasing_restricted"]: [""],
      ["pms-content-restrict-custom-redirect-url"]: [""],
      ["pms-content-restrict-message-logged_out"]: [""],
      ["pms-content-restrict-message-non_members"]: [""],
      ["pms-content-restrict-type"]: ["default"]
    },
    _links: {
      self: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/job-listings/1026"
        }
      ],
      collection: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/job-listings"
        }
      ],
      about: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/types/job_listing"
        }
      ],
      replies: [
        {
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/comments?post=1026"
        }
      ],
      wp_featuredmedia: [
        {
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/media/1027"
        }
      ],
      wp_attachment: [
        {
          href: "https://joinelectro.com/wp-json/wp/v2/media?parent=1026"
        }
      ],
      wp_term: [
        {
          taxonomy: "job_listing_category",
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/job-categories?post=1026"
        },
        {
          taxonomy: "job_listing_type",
          embeddable: true,
          href: "https://joinelectro.com/wp-json/wp/v2/job-types?post=1026"
        },
        {
          taxonomy: "job_listing_amenity",
          embeddable: true,
          href:
            "https://joinelectro.com/wp-json/wp/v2/job_listing_amenity?post=1026"
        },
        {
          taxonomy: "job_listing_region",
          embeddable: true,
          href:
            "https://joinelectro.com/wp-json/wp/v2/job_listing_region?post=1026"
        },
        {
          taxonomy: "job_listing_tag",
          embeddable: true,
          href:
            "https://joinelectro.com/wp-json/wp/v2/job_listing_tag?post=1026"
        }
      ],
      curies: [
        {
          name: "wp",
          href: "https://api.w.org/{rel}",
          templated: true
        }
      ]
    }
  }
];

export const stationOwnerResponse = {
  ID: "16",
  user_login: "tuztest",
  user_pass: "$P$BaCYfNuqFhXsPew34jNfSI.ZLtE6Z8/",
  user_nicename: "tuztest",
  user_email: "tuz.music@gmail.com",
  user_url: "",
  user_registered: "2019-07-31 14:22:38",
  user_activation_key: "",
  user_status: "0",
  display_name: "Jonathan Tuzman"
};
