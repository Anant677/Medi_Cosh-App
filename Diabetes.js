//YOUR FIRE BASE LINKS
var firebaseConfig = {
  apiKey: "AIzaSyD0WptvFpUkyzvqoKU2Q-8vUNvxhTLWx9o",
  authDomain: "diabetes-5bddb.firebaseapp.com",
  databaseURL: "https://diabetes-5bddb-default-rtdb.firebaseio.com",
  projectId: "diabetes-5bddb",
  storageBucket: "diabetes-5bddb.appspot.com",
  messagingSenderId: "1057868553194",
  appId: "1:1057868553194:web:9c36c48e8c6edd8c2ef093"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
      like2 = false;
      user_name = "Unknown";
      room_name = "Diabetes";
  
  function send()
  {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
     });
  
    document.getElementById("msg").value = "";
  }
  
  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
           firebase_message_id = childKey;
           message_data = childData;
  //Start code
           console.log(firebase_message_id);
             console.log(message_data);
             name = message_data['name'];
             message = message_data['message'];
           like = message_data['like'];
           name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick (1).png'></h4>";
           message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
  like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
           span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
  
          row = name_with_tag + message_with_tag +like_button + span_with_tag;
          like2 = false;       
          document.getElementById("output").innerHTML += row;
  //End code
        } });  }); }
  getData();
  
  function updateLike(message_id)
  {
    if(like2 == false){
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes  
     });
     like2 = true;
    }
  }
  
  