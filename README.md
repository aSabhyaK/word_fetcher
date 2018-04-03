# Word Fetcher

This application fetches and renders the N most frequently occuring words in a text corpus, on the UI. It can be found hosted over at https://wordfetcher.herokuapp.com/.

# Components

1. Angular v5.2.0
2. Express v4.16.3
3. Nodejs
4. Body Parser v1.18.2: parses the complete input stream and exposes the same to the request object.
, among other dependencies required internally by Angular and its CLI.

# Source code explanation

The UI is a text field which has been pre- validated to not allow anything other than natural numbers (i.e., the value can't be < 0, can't be a decimal, and no punctuation marks or alphabets are allowed.). Apart from that, in case the input exceeds the maximum number of unique words in the text, the user is prompted to enter a lesser value.

In the backend, once the value of the number N is recieved, data is extracted from the said URL (http://terriblytinytales.com/test.txt) and a hashmap is created out of the text, with the words as keys and their respective frequencies as the values. Before that, the entire text is stripped of the special characters as well the whitespaces.

Once the hashmap is created, it is sorted in the reverse order of the frequency, a loop runs over the map to enforce the fetching of strictly N records, a 2 dimensional array created out of the same, and sent back as response to the POST call /api/fetch.
