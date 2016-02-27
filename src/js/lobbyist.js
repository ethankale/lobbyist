
// Two data structures - an array of entities (people),
//   and an array of relationships.

var people = [];
var relations = [];

function newPerson(firstName, lastName) {
    
    // If no first and/or last name is supplied, randomly choose one
    var firstNames = ["Joe", "Jane", "Bob", "Rebecca", "Douglas", "Ursula",
        "Alexander", "Christine", "Trent", "Daria", "Sonny"];
    var lastNames = ["Adams", "LeGuin", "Miller", "Smith", "Anderson", "Nguyen",
        "Lott", "Cruz", "Bono"];
    
    var first = '';
    var last = '';
    
    firstName ? first = firstName : first = firstNames[Math.floor(Math.random() * firstNames.length)];
    lastName ? last = lastName : last = lastNames[Math.floor(Math.random() * lastNames.length)];
    //
    
    // Randomly select an "opinion" from 0 to 100; 50 = neutral
    var opinion = Math.floor(Math.random() * 100);
    //
    
    // Semi-normally distributed random selection of number of relationships
    var numberOfRelations = Math.floor(((Math.random() + Math.random() + Math.random()) * 2) + 3)
    //
    
    var person = {"first":first, "last":last, "opinion":opinion, "relations":numberOfRelations};
    return person;
};


// How many relationships does this person have?
function relationshipCount(personID, relationships) {
    
    var relationshipCount = 0;
    
    for (i=0; i<relationships.length; i++) {
        relationshipCount += relationships[i].firstPerson == personID ? 1 : 0;
        relationshipCount += relationships[i].secondPerson == personID ? 1 : 0;
    };
    
    return relationshipCount;
    
};

// Make people!
for (var i=0; i<25; i++) {
    
    people.push(newPerson());
    
};


// Make relationships!
for (var i=0; i<people.length; i++) {

    var currentPerson = people[i];
    var numberOfRelations = relationshipCount(i, relations);
    
    
    for (var j=numberOfRelations; j<4; j++) {
        var secondPerson = Math.floor(Math.random() * people.length);
        var strength = Math.floor(Math.random() * 3) + 1;
        
        relations.push( {"firstPerson":i, "secondPerson":secondPerson, "strength":strength} );
    };
}


