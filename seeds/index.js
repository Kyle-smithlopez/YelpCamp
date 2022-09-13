const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, ' Connection Error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '63192f564e81a348f69fa210',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, molestias, praesentium inventore dolorem molestiae similique facere blanditiis esse eaque vel reiciendis tenetur maiores at necessitatibus minima iusto quas consequuntur. Quasi.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      image: [
        {
          url: 'https://res.cloudinary.com/dgljipbda/image/upload/v1662874973/YelpCamp/shsb7snlcwfj2z4ysklc.jpg',
          filename: 'YelpCamp/shsb7snlcwfj2z4ysklc',
        },
        {
          url: 'https://res.cloudinary.com/dgljipbda/image/upload/v1662875222/YelpCamp/ga3sukny06oewytnlkvt.jpg',
          filename: 'YelpCamp/ga3sukny06oewytnlkvt',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
