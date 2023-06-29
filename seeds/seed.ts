import * as fs from 'fs';
import * as path from 'path';
import * as mongoose from 'mongoose';

import { Hotel } from '../src/hotels/interfaces/hotels.interface';
import { HotelSchema } from '../src/hotels/schemas/hotels.schema';

import { Image } from '../src/hotels/interfaces/image.interface';
import { ImageSchema } from '../src/hotels/schemas/image.schema';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/';

interface RawHotel {
  business_status: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
}

interface HotelWithImages extends Hotel {
  images: Image[]
}

type MongoInstance = typeof mongoose;

function loadHotels(): HotelWithImages[] {
  const seedPath = path.resolve(__dirname, 'seed.json');
  const rawData = fs.readFileSync(seedPath, 'utf8');
  const jsonData: RawHotel[] = JSON.parse(rawData);

  const hotels = jsonData.map((item: RawHotel) => {
    const { name, formatted_address: address, photos } = item;
    const images: Image[] = photos.map((photo) => {
      const { photo_reference: url, html_attributions: [ description ], width, height } = photo;
      return { url, description, width, height } as Image;
    });
    return { name, address, images };
  });

  return hotels;
}

async function setupDb(): Promise<MongoInstance> {
  try {
    const mongo = await mongoose.connect(MONGODB_URL);
  
    return mongo
  } catch(err) {
    console.error('[Seed] :  Error while starting connection: ', err);
    throw new Error(err);
  }
};

const seed = async () => {
  try {
    console.log(`[Seed] : running...`);
    await setupDb();

    const HotelModel = mongoose.model('Hotel', HotelSchema);
    const ImageModel = mongoose.model('Image', ImageSchema);

    await HotelModel.deleteMany({});
    await ImageModel.deleteMany({});

    const hotelsData = loadHotels();

    hotelsData.forEach(async (h) => {
      const newHotel = new HotelModel(h);
      await newHotel.save();

      const imagesToCreate = h.images.map(i => {
        const newImage = new ImageModel({ hotel: newHotel._id, ...i})
        newImage.save();
      });
      await Promise.all(imagesToCreate);
    });      

    const seededHotels = await HotelModel.find({});
    const seededImages = await ImageModel.find({});


    console.log(`[Seed] : [OK] populated with seed data -  Hotels: ${seededHotels.length}, Images; ${seededImages.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Seed] : [ERR] failed to seed database");
    process.exit(1);
  }
};

seed();