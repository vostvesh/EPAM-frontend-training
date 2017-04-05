  ajax = function () {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:4200/');
      xhr.addEventListener('load', function() {
        if (xhr.status == 200) {
          resolve(xhr.statusText);
        } else {
          reject('error, status: ' + xhr.status);
        }
      });
      xhr.addEventListener('error', function() {
        reject('cannot get ajax');
      });
      xhr.send();
    }).then(function (text){
      console.log('done!  ' + text);
    }, function(error){
      console.log('error' + error);
    });
  };