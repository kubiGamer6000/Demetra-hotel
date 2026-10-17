// Shared by the homepage gallery and the "Discover our spaces" popup.

// Category types
export type Category =
  | "hotel"
  | "garden"
  | "oldHouse"
  | "restaurant"
  | "relaxCenter"
  | "other";

// Image data structure
export interface GalleryImage {
  url: string;
  category: Category;
  alt: string;
}

// Gallery images data - you can add as many as you want here
export const galleryImages: GalleryImage[] = [
  // Hotel images
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/7d7dae1f-ce9f-4dd7-062a-c7a4b6de0800/w=1200",
    category: "hotel",
    alt: "Hotel Lobby",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/0cb91799-1786-4ccc-4caa-ead62804ca00/public",
    category: "restaurant",
    alt: "Restaurant",
  },

  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/f35ac973-9920-4720-ea92-a1c87a4f0200/w=1200",
    category: "hotel",
    alt: "Hotel Exterior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/2d80ed0a-4781-4a5d-def7-74a61544e800/public",
    category: "relaxCenter",
    alt: "Spa Reception",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/c68adc50-af9f-49ac-3080-6c38232c7400/w=1200",
    category: "hotel",
    alt: "Hotel Room",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/d533f10d-692b-44b5-2bb5-f28ca97fbd00/w=1200",
    category: "hotel",
    alt: "Hotel Room",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/214eacd5-ff87-48d3-62cd-2b76e48eae00/public",
    category: "garden",
    alt: "Garden Tea Area",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/688c8720-32ee-4c74-8469-7e28ca618f00/public",
    category: "oldHouse",
    alt: "Old House Interior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/bb72037b-9571-4e54-afd8-d8ea887fb700/w=1200",
    category: "hotel",
    alt: "Hotel Room",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/8c8e3e84-7aec-40b1-9f51-88b210fc6000/w=1200",
    category: "hotel",
    alt: "Hotel Room",
  },

  // Restaurant images
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/a8cc9e84-abe0-48af-00ce-e00d87806900/public",
    category: "restaurant",
    alt: "Restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/ef30929e-d28d-4499-fffd-b01b4cb70d00/public",
    category: "restaurant",
    alt: "Restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/9903fee7-eb59-48a1-1d53-7338b50f7900/public",
    category: "hotel",
    alt: "Hotel Room",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/7b01ef4d-f818-4419-ba07-3ead9c299a00/public",
    category: "restaurant",
    alt: "Restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/3f2678d3-441a-47bb-d3c5-0fa806031900/w=1200",
    category: "hotel",
    alt: "Hotel View",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/4f5a12b3-a570-42d6-56c2-4170fead1100/public",
    category: "restaurant",
    alt: "Restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/e569a87e-49de-4926-685a-d51915e26d00/public",
    category: "hotel",
    alt: "Hotel View",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/9f4f4d74-721f-445b-4358-f2f3bd022400/public",
    category: "restaurant",
    alt: "Restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/4b88f973-3ead-491b-8bc9-f47e1a6b5a00/public",
    category: "restaurant",
    alt: "Restaurant Terrace",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/0815c470-29a1-4885-607d-9d008f01d800/public",
    category: "restaurant",
    alt: "Restaurant Terrace",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/1723d8fe-f209-40a3-57cc-9a1619f56800/public",
    category: "restaurant",
    alt: "Restaurant Terrace",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/aac0755a-2181-4cd7-4271-1ac401466800/public",
    category: "hotel",
    alt: "Hotel View",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/597b33da-10d2-4892-8967-19b5e0cb8800/public",
    category: "restaurant",
    alt: "Restaurant Terrace",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/a55a564b-03aa-427e-0153-5f76ac509d00/public",
    category: "restaurant",
    alt: "Restaurant Terrace",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/22c4e709-113d-4b36-33d0-bbec4f1e0400/public",
    category: "garden",
    alt: "Garden Tea Area",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/01d5b925-54f5-4be9-9013-3caa91090400/public",
    category: "garden",
    alt: "Garden View",
  },

  // Relax Center images
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/c4afd910-82df-4bba-a8c2-c9ae5f4f9700/public",
    category: "relaxCenter",
    alt: "Spa Zone",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/e1055b63-e5bb-4651-21ca-fd68e10a5800/public",
    category: "relaxCenter",
    alt: "Sauna",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/e904c7e8-20bc-4790-9d14-cb25dfecfb00/public",
    category: "relaxCenter",
    alt: "Sauna",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/53092fd9-6304-4a40-b280-f7b9a8075200/public",
    category: "hotel",
    alt: "Old House Exterior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/43a2b3b2-8992-49d8-44d3-e5ac2655d900/public",
    category: "relaxCenter",
    alt: "Spa Treatment",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/1cc98be3-541f-4b80-143b-393ab0ea9a00/public",
    category: "relaxCenter",
    alt: "Spa Reception",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/31af5279-8f44-42e0-f79f-d400cdc72a00/public",
    category: "relaxCenter",
    alt: "Spa Reception",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/6ee82e5a-0315-4c25-ad2e-5b81275ec300/public",
    category: "relaxCenter",
    alt: "Spa Reception",
  },

  // Garden images
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/732c8d14-f976-4bdd-e6cb-44b4ad88cc00/public",
    category: "garden",
    alt: "Garden Tea Area",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/5949f57f-c414-459c-5610-8dd28a5f5f00/public",
    category: "garden",
    alt: "Garden View",
  },

  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/ef68bc5b-220f-4f8e-1d2d-034820079800/public",
    category: "hotel",
    alt: "Hotel View",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/48327c26-b240-4529-d2e6-dc314756f100/public",
    category: "garden",
    alt: "Garden Tea Area",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/ec9f9c60-a548-4210-e3ca-93ca6818f600/public",
    category: "garden",
    alt: "Garden View",
  },

  // Old House images
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/89657b4c-c10f-446c-bd83-dbfb44a27f00/public",
    category: "oldHouse",
    alt: "Old House Exterior",
  },
// veranda
  // {
  //   url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/149ccaec-8966-4f4d-7482-8f38fdc30200/public",
  //   category: "oldHouse",
  //   alt: "Old House Interior",
  // },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/0df4ceb5-1e5e-4772-4fbd-32744c535500/public",
    category: "oldHouse",
    alt: "Old House Exterior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/1afe4bef-e4c9-4162-c947-cc3f503c8f00/public",
    category: "oldHouse",
    alt: "Old House Exterior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/eab0064b-13cc-44fa-e13f-5ec42d20d100/public",
    category: "oldHouse",
    alt: "Old House Exterior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/f5627c1e-3105-415a-fde2-130b6752dd00/public",
    category: "hotel",
    alt: "Hotel View",
  },
  // Add more images as needed...
];

/** Returns a Cloudflare Images flexible variant of `url` at the given width. */
export function resizeImage(url: string, width: number) {
  return url.replace(/\/[^/]+$/, `/w=${width},format=auto`);
}

export function imagesForCategory(category: Category) {
  return galleryImages.filter((image) => image.category === category);
}
