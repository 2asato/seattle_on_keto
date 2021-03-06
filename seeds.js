var mongoose = require('mongoose');
var Location = require('./models/location');

// seed data
var data = [
    {
        name: 'The Walrus and the Carpenter',
        neighborhood: 'Ballard',
        restaurantType: 'Restaurant',
        serves: 'Breakfast, Lunch, Dinner',
        foodType: 'Seafood',
        description: 'The Walrus remains a neighborhood spot — a friendly, often bustling, always casual, place to enjoy icy cold piles of oysters, delicious plates, wines by the glass, beer, cider, and smart cocktails.',
        website: 'thewalrusbar.com/',
        menu: 'thewalrusbar.com/menu/',
        yelp: 'yelp.com/biz/the-walrus-and-the-carpenter-seattle',
        kids: 'Yes',
        coverImage: 'https://www.thewalrusbar.com/uploads/_900x900_fit_center-center_85_none/Walrus01.jpg',
        daysOpen: 'Monday',
        phoneNumber: '(206)395-9227',
        address: {
            street: '4743 Ballard ave NW',
            city: 'Seattle',
            state: 'WA',
            zip: '98107',      
        },
    
    
    },
    {
        name: 'The Pink Door',
        neighborhood: 'Pike Place',
        restaurantType: 'Restaurant',
        foodType: 'Italian',
        description: 'The Pink Door serves delicious, uncomplicated Italian-American food during lunch and dinner. Many offerings derive from La Padronas family recipes—inspired from weekly Sunday gatherings and days in her grandfathers garden.',
        website: 'thepinkdoor.net/',
        menu: 'thepinkdoor.net/menus',
        kids: 'Yes',
        coverImage:
            'https://images.squarespace-cdn.com/content/v1/574335cf59827e45443e86b7/1503937961211-E9WF95ZHXPJEO11Z5PIM/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/4A3A4021.jpg',
    
        phoneNumber: '(206)443-13241'
    
    }
]

// seed db
function seedDB() {
    // remove locations to not clutter DB
    Location.deleteMany({}, function(err) {
        if(err) {
            console.log(err);
            
        } else {
            console.log('deleted locations');
            
        }
    })
    data.forEach(function(seed) {
        Location.create(seed, function(err, location) {
            if(err) {
                console.log(err);
                
            } else {
                console.log('added a location');
                
            }
        })
    })
}

module.exports = seedDB;