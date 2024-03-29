/* add & update (add & delete comments) activity*/
const express = require("express");
const router = express.Router();
const { ObjectId } = require('mongodb');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://user1:plannerUser1@cluster0.blwghus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(url, { useUnifiedTopology: true });
let collection = null;
let collectionLogin = null;
let collectionFavourites = null;


//Insert some data for  favourites
// const insertOneStarterDataFavourites = async function () {
//     return collectionFavourites.insertMany([
//         {
//             _id: "testNew@gmail.com", favourite: [{
//                 _id: "1", activityName: 'St Andrews West Sands Beach', lat: 56.35622, long: -2.80834, location: "West Sands",
//                 age: "5+", type: 'Beaches', price: "20",
//                 decription: "", images: ["https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
//                 reviews: [{ userName: "Cath", comment: "Love the Sunset", rating: "4" }, { userName: "Rambo", comment: "The weather is too cold, but was fun", rating: "3" }]
//             },{

//                 _id: "3", activityName: 'Tower of London', lat: 51.50853, long: -0.07613, location: "London",
    
//                 age: "10+", type: 'Historic Sites', price: "30",
    
//                 decription: "Famous Tower of London where lots of royals died", images: ["https://upload.wikimedia.org/wikipedia/commons/5/5a/La_Torre%2C_Londres%2C_Inglaterra%2C_2014-08-11%2C_DD_071.JPG", "https://upload.wikimedia.org/wikipedia/commons/e/ec/Tower_of_London_from_the_Shard_%288515883950%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/1/1e/Whitetowerlondon.jpg"],
    
//                 reviews: [{ userName: "Calvin", comment: "so cool, wow.", rating: "1" }, { userName: "Tim", comment: "Best for short visit", rating: "3" }]
    
//             },{

//                 _id: "5", activityName: 'Birdwatching', lat: 56.35910, long: -2.89052, location: "Guardbridge",
    
    
    
//                 age: "60+", type: 'Outdoors', price: "0",
    
//                 decription: "Cool birds in Guardbridge", images: ["https://upload.wikimedia.org/wikipedia/commons/0/07/Foto_Marcelo_Sirkis_3_%2849574785843%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/b/b6/Pica_pica_-_Compans_Caffarelli_-_2012-03-16.jpg", "https://upload.wikimedia.org/wikipedia/commons/3/3b/Blauelester_donana.jpg"],
    
//                 reviews: []
    
//             },{

//                 _id: "7", activityName: 'Machu Picchu', lat: -13.16307, long: -72.54512, location: "Peru",
    
//                 age: "20+", type: 'Outdoors', price: "0",
    
//                 decription: "", images: ["https://upload.wikimedia.org/wikipedia/commons/1/13/Before_Machu_Picchu.jpg", "https://upload.wikimedia.org/wikipedia/commons/0/09/Machu_Picchu_%283833992683%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/5/59/Machupicchu_intihuatana.JPG"],
    
//                 reviews: [{ userName: "Bill", comment: "bucket list", rating: "5" }]
    
//             },{

//                 _id: "9", activityName: 'Cromars Fish and Chips', lat: 56.33871, long: -2.79902, location: "St Andrews",
    
//                 age: "10+", type: 'Dining', price: "20",
    
    
    
//                 decription: "Overpriced fish and chips", images: ["https://upload.wikimedia.org/wikipedia/commons/f/ff/Fish_and_chips_blackpool.jpg", "https://upload.wikimedia.org/wikipedia/commons/7/76/Fish_and_chips.jpg", "https://upload.wikimedia.org/wikipedia/commons/9/99/Mobile_Fish_and_Chips.JPG"],
    
//                 reviews: [{ userName: "Calvin", comment: "so cool, wow.", rating: "1" }, { userName: "Tim", comment: "Best for short visit", rating: "3" }]
    
    
    
    
    
    
    
//             }]
//         },
//         {
//             _id: "test@gmail.com", favourite: [{
//                 _id: "1", activityName: 'St Andrews West Sands Beach', lat: 56.35622, long: -2.80834, location: "West Sands",
//                 age: "5+", type: 'Beaches', price: "20",
//                 decription: "", images: ["https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
//                 reviews: [{ userName: "Cath", comment: "Love the Sunset", rating: "4" }, { userName: "Rambo", comment: "The weather is too cold, but was fun", rating: "3" }]
//             },{

//                 _id: "7", activityName: 'Machu Picchu', lat: -13.16307, long: -72.54512, location: "Peru",
    
//                 age: "20+", type: 'Outdoors', price: "0",
    
//                 decription: "", images: ["https://upload.wikimedia.org/wikipedia/commons/1/13/Before_Machu_Picchu.jpg", "https://upload.wikimedia.org/wikipedia/commons/0/09/Machu_Picchu_%283833992683%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/5/59/Machupicchu_intihuatana.JPG"],
    
//                 reviews: [{ userName: "Bill", comment: "bucket list", rating: "5" }]
    
//             },{

//                 _id: "9", activityName: 'Cromars Fish and Chips', lat: 56.33871, long: -2.79902, location: "St Andrews",
    
//                 age: "10+", type: 'Dining', price: "20",
    
    
    
//                 decription: "Overpriced fish and chips", images: ["https://upload.wikimedia.org/wikipedia/commons/f/ff/Fish_and_chips_blackpool.jpg", "https://upload.wikimedia.org/wikipedia/commons/7/76/Fish_and_chips.jpg", "https://upload.wikimedia.org/wikipedia/commons/9/99/Mobile_Fish_and_Chips.JPG"],
    
//                 reviews: [{ userName: "Calvin", comment: "so cool, wow.", rating: "1" }, { userName: "Tim", comment: "Best for short visit", rating: "3" }]
    
    
    
    
    
    
    
//             },{

//                 _id: "3", activityName: 'Tower of London', lat: 51.50853, long: -0.07613, location: "London",
    
//                 age: "10+", type: 'Historic Sites', price: "30",
    
//                 decription: "Famous Tower of London where lots of royals died", images: ["https://upload.wikimedia.org/wikipedia/commons/5/5a/La_Torre%2C_Londres%2C_Inglaterra%2C_2014-08-11%2C_DD_071.JPG", "https://upload.wikimedia.org/wikipedia/commons/e/ec/Tower_of_London_from_the_Shard_%288515883950%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/1/1e/Whitetowerlondon.jpg"],
    
//                 reviews: [{ userName: "Calvin", comment: "so cool, wow.", rating: "1" }, { userName: "Tim", comment: "Best for short visit", rating: "3" }]
    
//             }]
//         }
//     ])
//         .then(res => console.log("data inserted in Fav with ID", res.insertedIds))
//         .catch(err => {
//             console.log("Could not add data ", err.message);
//             //For now, ingore duplicate entry errors, otherwise re-throw the error for the next catch
//             if (err.name != 'MongoBulkWriteError' || err.code != 11000) throw err;
//         })
// }


client.connect()
    .then(
        connection => {
            //if collection is not present it is automatically created 
            // collection = client.db().collection(config.collection); //comment this when createCollection() is uncommented
            collectionLogin = client.db().collection("login");
            collectionFavourites = client.db().collection("favourite")
            console.log("Favourite: Connected to Database");
        }
    )
    .catch(err => {
        console.log(`Error in connecting to Database ${url.replace(/:([^:@]{1,})@/, ':****@')}`, err);
    })
    //.then(() => client.db().collection("favourite").drop()).then(()=>console.log("droped fav")) //--> to delete collection
    //.then(() => insertOneStarterDataFavourites()) //--> to inset data
//.then(()=>collectionFavourites.deleteOne({_id:"yash@gmail.com"})).then(()=>{console.log("deleted")}).catch(()=>console.log("err"))



/**
 * method:POST body{userEmail:userEmail,activityName:activityName}
 * url: http://localhost:8000/favourite
 * References : https://www.mongodbtutorial.org/mongodb-crud/mongodb-updateone/
 */
router.post("/add", function (request, response) {
    let userEmail = request.body.userEmail;
    let activityName = request.body.activityName;
    // let userEmail = "yash@gmail.com";
    // let activityName = "St Andrews Cathedral";
    collectionLogin.find({ _id: userEmail }).toArray().then(docL => {
        if (docL.length > 0) { //verify if user exsists in system
            collection.find({ activityName: activityName }).toArray().then(docA => { //find if the activity is in the collection 
                console.log(docA)
                collectionFavourites.find({ _id: userEmail }).toArray()
                    .then(docFav => {
                        console.log("docFav")
                        console.log(docFav)

                        if (docFav.length > 0) { //check if there is already an exsisting collection of favourites
                            collectionFavourites.find({ _id: userEmail }).toArray()
                                .then(favouriteArray => {
                                    console.log("favouriteArray")
                                    console.log(favouriteArray)

                                    console.log("favouriteArray[0]")
                                    console.log(favouriteArray[0])

                                    console.log("favouriteArray[0].fav")
                                    console.log(favouriteArray[0].favourite)
                                    console.log("favouriteArray[0].fav[0]")

                                    console.log(favouriteArray[0].favourite)

                                    console.log("Doc a");
                                    console.log(docA[0])

                                    let newFavArray = favouriteArray[0].favourite;


                                    //check if already exsists

                                    let newFavArrayForCheck = newFavArray.filter((element) => element.activityName == activityName);
                                    if (newFavArrayForCheck.length > 0) {
                                        throw new Error('Already in fav');
                                    } else {

                                    }


                                    newFavArray.push(docA[0])
                                    console.log("newFavArray");
                                    console.log(newFavArray)
                                    // console.log(activityName);
                                    // console.log(favouriteArray[0].favourite)
                                    // favouriteArray[0].favourite[0].push( docA[0]  ); //push new value
                                    // console.log(favouriteArray)
                                    // console.log("favouriteArray fav")
                                    // console.log(favouriteArray[0].favourite[0])

                                    //collectionFavourites.deleteOne({_id:"yash@gmail.com"}).then(()=>{console.log("deleted")})

                                    collectionFavourites.updateOne({ _id: userEmail }, { $set: { "favourite": newFavArray } }).then(() => { //update the favourites collection
                                        response.status(200).json({ message: "Successfully Added" })
                                    }).catch(err => {
                                        response.status(500).json({ message: "Failed to update value, already exsists" })
                                    })
                                }).catch(err => {
                                    response.status(500).json({ message: "Failed to add, already exsists" })
                                })


                        } else {
                            collectionFavourites.insertOne({ _id: userEmail, favourite: docA     }).then(  //else insert new document
                                response.status(200).json({ message: "Successfull Inserted" })).catch(err => {
                                    //console.log("Error ",err)
                                    response.status(500).json({ message: "Failed to add value" })
                                })
                        }
                    })




            }).catch(e => {
                response.send(404).json({ message: "No such activity Name" })
            })
        } else {
            response.send(401).json({ message: "Login first" })
        }
    })

});


/**
 * method:DELETE body{userEmail:userEmail,activityName:activityName}
 * url: http://localhost:8000/favourite/delete
 * References : https://www.mongodbtutorial.org/mongodb-crud/mongodb-updateone/
 */
router.delete("/delete", function (request, response) {
    let userEmail = request.body.userEmail;
    let activityName = request.body.activityName;
    // let userEmail = "yash@gmail.com";
    // let activityName = "St Andrews Cathedral";
    console.log(userEmail + " " + activityName)
    collectionLogin.find({ _id: userEmail }).toArray().then(docL => {

        if (docL.length > 0) { //verify if user exsists in system
            collection.find({ activityName: activityName }).toArray().then(docA => { //find if the activity is in the collection 
                //  console.log(docA)
                collectionFavourites.find({ _id: userEmail }).toArray()
                    .then(docFav => {
                        // console.log("docFav")
                        // console.log(docFav)

                        if (docFav.length > 0) { //check if there is already an exsisting collection of favourites
                            collectionFavourites.find({ _id: userEmail }).toArray()
                                .then(favouriteArray => {
                                    // console.log("favouriteArray")
                                    // console.log(favouriteArray)

                                    // console.log("favouriteArray[0]")
                                    // console.log(favouriteArray[0])

                                    // console.log("favouriteArray[0].fav")
                                    // console.log(favouriteArray[0].favourite)
                                    // console.log("favouriteArray[0].fav[0]")

                                    //     console.log(favouriteArray[0].favourite)

                                    //     console.log("Doc a");
                                    //    console.log( docA[0] )

                                    var newFavArray = favouriteArray[0].favourite;
                                    //    console.log("newFavArray");
                                    //    console.log( newFavArray );
                                    newFavArray = newFavArray.filter((element) => element.activityName !== activityName);

                                    //    console.log("newFavArray");
                                    //    console.log( newFavArray);


                                    //    console.log("newFavArray");
                                    //    console.log( newFavArray )


                                    collectionFavourites.updateOne({ _id: userEmail }, { $set: { "favourite": newFavArray } }).then(() => { //update the favourites collection
                                        response.set(200).json({ message: "Successfully deleted" })
                                    }).catch(err => {
                                        response.set(500).json({ message: "Failed to delete value" })
                                    })
                                })


                        } else {
                            // collectionFavourites.insertOne({ _id: userEmail, favourite: docA     }).then(  //else insert new document
                            //     response.send(200).json({ message: "Successfull Inserted" })).catch(err => {
                            //         //console.log("Error ",err)
                            response.send(500).json({ message: "Failed to delete" })
                            //     })
                        }
                    })




            }).catch(e => {
                response.sendStatus(404).json({ message: "No such activity Name" })
            })
        } else {
            response.sendStatus(401).json({ message: "Login first" })
        }
    })

});




/**
 * method: GET  param: userEmail
 * url: http://localhost:8000/favourite/:userEmail
 */
router.get("/:userEmail", function (request, response) {

    let userEmail = request.params.userEmail;
    collectionLogin.findOne({ _id: userEmail }).then(doc => {
        console.log(doc)

        if (doc) {
            collectionFavourites.find({ _id: userEmail }).toArray().then(doc => {
                console.log("doc")
                console.log(doc[0])
                response.status(200).json({ "favourite": doc });
            }).catch(err => { response.status(404).json({ message: "Error finding favourites" }); })
        } else {
            response.status(401).json({ message: "Login first" })
        }
    })

})

router.get("/get", function (req, res) {
    console.log("here")
    collectionFavourites.find({}).toArray()
        .then(doc => {
            res.status(200).json(doc)
            console.log('find all favourites data')
            console.log(doc)
        })
        .catch(err => {
            console.log("could not find" + err)
            res.status(400).json({ msg: `Could not find` })
        })

})



module.exports = router;