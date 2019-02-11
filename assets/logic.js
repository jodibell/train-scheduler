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

// When user clicks the submit button
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

    // FirstTrainTime (pushed back 1 year to make sure it comes before current time)
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var Remainder = diffTime % frequency;
    console.log(Remainder);

    // Minutes Until Train
    var MinutesTillTrain = frequency - Remainder;
    console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(MinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    //Append (appendChild) newTrainSchedule to jwoodExpressSchedule (create a well?).
      //This does not
      $("#well").append(
        `<tr>
          <td>${origin}</td>
          <td>${destination}</td>
          <td>${frequency} minutes</td>
          <td>${nextTrain}</td>
          <td>${MinutesTillTrain}</td>
        </tr>`
      )
  });
