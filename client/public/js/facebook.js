var accessToken = null
var userID = null

if (document.getElementById("facebookLogin") != null) {
  document.getElementById("facebookLogin").onclick = function()  {
    FB.init({
      appId      : '1139442493144116',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
      
    FB.AppEvents.logPageView();   
    
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };
  
    
    
    function statusChangeCallback(response){
       if(response.status === 'connected'){
        //  console.log('Logged in and authenticated');
        //  console.log(response)
        //  console.log(response.authResponse.accessToken)
         accessToken = response.authResponse.accessToken
         userID = response.authResponse.userID
         testAPI();
       } else {
         console.log('Not authenticated');
         document.getElementById("facebookError").innerHTML = 'Not authenticated'
       }
     }
     
  
  function testAPI(){
    FB.api('/me?fields=name,email,birthday,location', function(response){
      if(response && !response.error){
        // console.log(response);
        const data = { userID, accessToken  } 
        
  
        fetch(`http://localhost:5000/api/users/facebookLogin`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })  
  
        .then(response => {
          response.json().then((res) => {
            const jwt = {
              token: res.token
            }
  
            localStorage.setItem('jwt', JSON.stringify(jwt))
          })
          
        })
        .catch(err => {
          console.log(err)
          document.getElementById("facebookError").innerHTML = `${err}`
        })
      }
  
      // FB.api('/me/feed', function(response){
      //   if(response && !response.error){
      //     console.log(response);
      //   }
      // });
    })
  }
  
  
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}


