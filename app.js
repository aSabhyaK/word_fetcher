const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    request = require("request");
    app.use(bodyParser.json());
    app.post('/api/fetch', function (req, res) {
        console.log(req.body.value);
        var n = req.body.value;
        // retrieve all the text from the url, then create a hashmap
        // to store all the words and their frequencies, and then sort the 
        // hashmap according to the values and fetch the top n values from there.

        
        var options = { 
            method: 'GET',
            url: 'http://terriblytinytales.com/test.txt',
            headers: { 
                'Cache-Control': 'no-cache' 
            }
        };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          //_ is being retained as a word character
          //[a-zA-Z]+ could also have been used here
          //var array = String(body).match(/[^\W\d\s]+/g);
          var array = String(body).match(/[a-zA-Z'_]+/g);
          var myMap = new Map();
          var value = '';

          for(let x of array) {
            value = x.toLowerCase();

            if(myMap.has(value))
                myMap.set(value, myMap.get(value) + 1);
            
            else
                myMap.set(value, 1);
          }

          if(n > myMap.size) {
              res.send({Error: "Value too high, try a lower value."});
              return;
          }

          myMap[Symbol.iterator] = function* () {
            yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
          }

          var count = n;
          var finalStructure = [];
          for(let [key, value] of myMap) {
            if(count == 0)
                break;

            finalStructure.push([key, value]);
            count --;
          }

          //need to see what happens in case there are multiple entries for
          // with a similar frequency
          //res.send({message : 'Got a POST request'});
          res.send({data: finalStructure});
        });
      })
    app.use(express.static('dist'))
    app.listen(process.env.PORT || 3000, () => console.log('ANGULAR app listening on port 3000!'))