//////////////////
// Data Structures
//////////////////

// Two data structures - an array of entities (people),
//   and an array of relationships.

var people = [];
var relations = [];

function newPerson(id, firstName, lastName) {
    
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
    
    var person = {"id": id, "first":first, "last":last, "opinion":opinion, "relations":numberOfRelations};
    return person;
};


// Who is this person related to, and with what strength?
function relationshipList(personID, relationships) {
    
    var relations = [];
    
    for (var i=0; i<relationships.length; i++) {
        
        var isRelated = 0;
        isRelated += relationships[i].firstPerson == personID ? 1 : 0;
        isRelated += relationships[i].secondPerson == personID ? 1 : 0;
        
        if (isRelated > 0) {
            relations.push([i, relationships[i].strength]);
        };
    };
    
    return relations;
    
};

// Make people!
for (var i=0; i<25; i++) {
    
    people.push(newPerson(i));
    
};


// Make relationships!
for (var i=0; i<people.length; i++) {

    var currentPerson = people[i];
    var numberOfRelations = relationshipList(i, relations).length;
    
    //console.log(i);
    
    for (var j=numberOfRelations; j<4; j++) {
        var secondPerson = Math.floor(Math.random() * people.length);
        var strength = Math.floor(Math.random() * 3) + 1;
        
        relations.push( {"firstPerson":i, "secondPerson":secondPerson, "strength":strength} );
    };
}

////////////////
// Make display!
////////////////

var r = 20;   //Radius of each circle

var margin = {top: r*2, right: r*2, bottom: r*2, left: r*2};

var w = (960 - margin.left - margin.right),  //Width of viewport
    h = (500 - margin.top - margin.bottom),  //Height of veiwport
    n = 5;   //Number of columns
    
var verticalSpace = h / (Math.ceil(people.length/n));
var horizSpace = w / n;
    
    
var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.selectAll("circle")
    .data(people)
  .enter().append("circle")
    .attr("cx", function(d) { return ((d.id % n) * horizSpace); })
    .attr("cy", function(d) { return (Math.floor( (d.id) / n) * verticalSpace); })
    .attr("data-id", function(d) { return d.id; })
    .attr("r", r);


