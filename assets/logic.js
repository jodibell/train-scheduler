// Initialize Firebase
  var config = {
    apiKey: "AIzaSyANzNg8C8eA6YgSnVyeNviE8Bgdp2lnOwY",
    authDomain: "train-scheduler-3098a.firebaseapp.com",
    databaseURL: "https://train-scheduler-3098a.firebaseio.com",
    projectId: "train-scheduler-3098a",
    storageBucket: "train-scheduler-3098a.appspot.com",
    messagingSenderId: "266664632276"
  };
  
  firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

// Initial Values
var origin = "";
var destination = "";
var firstTrainTime = "HH:MM:SS?";
var frequency = "MM";

// Whenever a user clicks the submit button
$("#submit").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();
  
    // Get the input values
    origin = $("#origin").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = parseInt($("#frequency").val().trim());
  
    // Save the new train schedule in Firebase
    database.ref().push({
        origin,
        destination,
        firstTrainTime,
        frequency
    })
  
      // Log the new train schedule
      console.log("New Train Schedule" + origin + destination + firstTrainTime + frequency + "min");
      
      //Do I need to make an array or object (newTrainSchedule) to hold origin, destination, firstTrainTime and frequency for each train schedule?

      //Append (appendChild) newTrainSchedule to jwoodExpressSchedule (create a well?).

    // FirstTrainTime (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minutes Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  });
