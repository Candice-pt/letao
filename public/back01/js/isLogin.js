$.ajax({
      url : '/employee/checkRootLogin',
      dataType : 'json',
      success : function(res){
          if(res.error == 400){
              location.href = 'login.html'
          }
      }
  })  