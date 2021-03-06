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

        // fetching the data from the given URL
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

          // looping over the stripped array
          for(let x of array) {
            value = x.toLowerCase();

            if(myMap.has(value))
                myMap.set(value, myMap.get(value) + 1);
            
            else
                myMap.set(value, 1);
          }

          // in case the input is more than the number of the unique words in the text
          if(n > myMap.size) {
              res.send({Error: "Value too high, try a lower value."});
              return;
          }

          // sorting the map based on the values
          myMap[Symbol.iterator] = function* () {
            yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
          }

          var count = n;
          // array to store the required value
          var finalStructure = [];
          for(let [key, value] of myMap) {
            if(count == 0)
                break;

            finalStructure.push([key, value]);
            count --;
          }

          // sending the response back
          res.send({data: finalStructure});
        });
      })

    app.use(express.static('dist'))
    app.listen(process.env.PORT || 3000, () => console.log('ANGULAR app listening on port 3000!'))
