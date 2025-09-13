const mongoose = require("mongoose");
const User = require("../models/User");
const Place = require("../models/Place");
const Review = require("../models/Review");

mongoose.connect("mongodb://127.0.0.1:27017/geoPractice")
  .then(async () => {
    // Clear old data
    await User.deleteMany({});
    await Place.deleteMany({});
    await Review.deleteMany({});

    // Insert Users
    const users = await User.insertMany([
      { name: "Saad", email: "saad@example.com", password: "123456", role: "admin" },
      { name: "Ali", email: "ali@example.com", password: "123456", role: "user" },
      { name: "Sara", email: "sara@example.com", password: "123456", role: "user" },
      { name: "Hina", email: "hina@example.com", password: "123456", role: "user" },
      { name: "Usman", email: "usman@example.com", password: "123456", role: "user" },
      { name: "Ayesha", email: "ayesha@example.com", password: "123456", role: "user" },
      { name: "Bilal", email: "bilal@example.com", password: "123456", role: "user" },
      { name: "Fatima", email: "fatima@example.com", password: "123456", role: "user" },
      { name: "Hamza", email: "hamza@example.com", password: "123456", role: "user" },
      { name: "Nida", email: "nida@example.com", password: "123456", role: "user" }
    ]);

    // Insert Places
    const places = await Place.insertMany([
      // Cafes
      { name: "Cafe Lahore", description: "Coffee and snacks", location: { type: "Point", coordinates: [74.3587, 31.5204] } },
      { name: "Coffee Planet Karachi", description: "Modern cafe with lattes", location: { type: "Point", coordinates: [67.065, 24.8607] } },
      { name: "Chai Khana Islamabad", description: "Trendy cafe with desserts", location: { type: "Point", coordinates: [73.055, 33.684] } },

      // Diners
      { name: "Karachi Diner", description: "Best biryani in town", location: { type: "Point", coordinates: [67.0099, 24.8615] } },
      { name: "Lahore Diner", description: "Parathas and nihari", location: { type: "Point", coordinates: [74.363, 31.5497] } },

      // Grills
      { name: "Islamabad Grill", description: "BBQ and steaks", location: { type: "Point", coordinates: [73.0551, 33.6844] } },
      { name: "Karachi BBQ House", description: "Famous seekh kebabs", location: { type: "Point", coordinates: [67.0202, 24.8605] } },

      // Tea Houses
      { name: "Quetta Tea House", description: "Famous doodh patti", location: { type: "Point", coordinates: [66.9750, 30.1798] } },
      { name: "Lahore Chai Wala", description: "Special karak chai", location: { type: "Point", coordinates: [74.3500, 31.5200] } },

      // Sweets
      { name: "Multan Sweets", description: "Traditional sweets & halwa", location: { type: "Point", coordinates: [71.5249, 30.1575] } },
      { name: "Karachi Mithai House", description: "Fresh gulab jamun", location: { type: "Point", coordinates: [67.0301, 24.8609] } },
      { name: "Lahore Jalebi Center", description: "Crispy hot jalebis", location: { type: "Point", coordinates: [74.3550, 31.5650] } }
    ]);

    // Insert Reviews
    await Review.insertMany([
      // Cafes
      { place: places[0]._id, user: users[1]._id, rating: 5, comment: "Amazing coffee!" },
      { place: places[1]._id, user: users[2]._id, rating: 4, comment: "Latte was smooth." },
      { place: places[2]._id, user: users[3]._id, rating: 5, comment: "Loved the desserts." },

      // Diners
      { place: places[3]._id, user: users[4]._id, rating: 4, comment: "Great biryani but spicy." },
      { place: places[4]._id, user: users[5]._id, rating: 5, comment: "Perfect nihari with naan!" },

      // Grills
      { place: places[5]._id, user: users[0]._id, rating: 5, comment: "Steaks are delicious!" },
      { place: places[6]._id, user: users[6]._id, rating: 4, comment: "BBQ was juicy." },

      // Tea Houses
      { place: places[7]._id, user: users[1]._id, rating: 3, comment: "Tea was good but slow service." },
      { place: places[8]._id, user: users[7]._id, rating: 5, comment: "Best karak chai in Lahore!" },

      // Sweets
      { place: places[9]._id, user: users[2]._id, rating: 4, comment: "Loved the halwa!" },
      { place: places[10]._id, user: users[8]._id, rating: 5, comment: "Fresh gulab jamun, soft and warm." },
      { place: places[11]._id, user: users[9]._id, rating: 5, comment: "Crispy jalebi, must try!" },

      // More mixed reviews
      { place: places[0]._id, user: users[4]._id, rating: 4, comment: "Good snacks, cozy place." },
      { place: places[3]._id, user: users[7]._id, rating: 3, comment: "Service was a bit slow." },
      { place: places[6]._id, user: users[5]._id, rating: 5, comment: "Best kebabs in Karachi!" },
      { place: places[2]._id, user: users[9]._id, rating: 4, comment: "Ambience is great." },
      { place: places[9]._id, user: users[3]._id, rating: 5, comment: "Sweet shop with huge variety." },
    ]);

    console.log("✅ Data seeded with more users, places, and reviews!");
    process.exit();
  })
  .catch(err => console.error(err));
