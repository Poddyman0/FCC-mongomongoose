require('dotenv').config();
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//run npm start to test.

mongoose.connect(process.env.MONGO_URI, 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }, 
  () => {
    console.log("DB connection successfull")
  }
);

/*
Create a person schema called personSchema with the following shape:


Now, create a model from the personSchema and assign it to the existing variable Person.
*/ 


const personSchema = new Schema({
  name: {type: String, required: true},
  age: {type: Number},
  favoriteFoods: [{type: String}],
})

let Person = model("Person", personSchema)


const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "Bill Gates",
    age: 28,
    favoriteFoods: ["Apple Pie", "Cakes", "Pasta"]
  })
  newPerson.save(function(err, data) {
    if (err) return done(err);
    done(null, data);
  })
};

const arrayOfPeople = [
  {
    name: "Tony Stark",
    age: 50,
    favoriteFoods: ["Rice", "Chicken", "Chips"]
  },
  {
    name: "Julia Robberts",
    age: 66,
    favoriteFoods: ["Burgers", "Tomato Soup", "Steak"]
  },
  {
    name: "Phill Mitchel",
    age: 70,
    favoriteFoods: ["Cake", "Lamb Curry", "Samosa"]
  },

]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  })
};



const findPeopleByName = (personName, done) => {
  Person.find({ name: personName}, (err, person) => {
    if (err) return done(err);
    done(null, person);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, person) => {
    if (err) return done(err);
    done(null, person);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, person) => {
    if (err) return done(err);
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    person.favoriteFoods.push("hamburger")
    person.save((error, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    })

  })
  

};

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, (err, person) => {
        if (err) return done(err);
        done(null, person);
    })
}

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (err, person) => {
    if (err) return done(err);
    done(null, person);
  })
}

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, person) => {
    if (err) return done(err);
    done(null, person);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch}).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
