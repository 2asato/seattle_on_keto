var express = require('express'),
    router = express.Router({mergeParams: true}),
    KetoOption = require('../models/ketoOptions'),
    Location = require('../models/location');


// ==================
// KETO-OPTIONS ROUTES
// ==================

router.get('/locations/:id/keto-options/new', isSignedIn, function(req, res) {
    Location.findById(req.params.id, function(err, location) {
        if (err) {
            console.log(err);
            
        } else {
            res.render('ketoOptions/new', { location: location });
        }
    })
})


// ketoOptions create route
router.post('/locations/:id/keto-options', isSignedIn, function(req, res) {
    // lookup location by id
    Location.findById(req.params.id, function(err, location) {
        if (err) {
            console.log(err);
            res.redirect('/locations')
        } else {
            KetoOption.create(req.body.ketoOption, function(err, ketoOption) {
                if (err) {
                    console.log(err);
                    
                } else {
                    console.log(ketoOption + 'BEFORE');
                    
                    ketoOption.location.id = location._id;
                    ketoOption.location.name = location.name;
                    ketoOption.save();
                    location.ketoOptions.push(ketoOption);
                    location.save();
                    console.log(ketoOption + 'AFTER');
                    
                    res.redirect('/locations/' + location._id)
                }
            })
        }
    })
})

// ketoOptions edit route
router.get('/locations/:id/keto-options/:ketoOption_id/edit', function(req, res) {
    Location.findById(req.params.id, function(err, foundLocation) {
        if (err || !foundLocation) {
            return res.redirect('back');
        } 
        KetoOption.findById(req.params.ketoOption_id, function(err, foundKetoOption) {
            if (err) {
                res.redirect('back')
            } else {
                res.render('ketoOptions/edit', { location_id: req.params.id, ketoOption: foundKetoOption})
            }
        });
    });
});

// ketoOptions update route
router.put('/locations/:id/keto-options/:ketoOption_id', function(req, res) {
    KetoOption.findByIdAndUpdate(req.params.ketoOption_id, req.body.ketoOption, function(err, updatedKetoOption) {
        if (err) {
            res.redirect('back');
        } else {
            
            res.redirect('/locations/' + req.params.id);
        }
    })
})

// ketoOptions destroy route
router.delete('/locations/:id/keto-options/:ketoOption_id', function(req, res) {
    KetoOption.findByIdAndRemove(req.params.ketoOption_id, function(err) {
        if (err) {
            res.redirect('back')
        } else {
            res.redirect('/locations/' + req.params.id);
        }
    })
})


// =============
// MIDDLEWARE
// =============

function isSignedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

module.exports = router;