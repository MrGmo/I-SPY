# I-SPY

Hi there!

This repo contains my I-SPY app. It's an app that scans images using several of Microsoft Azure's AI models. It's capable of performing object, facial, tag, and adult content detection.

**Link to project:** https://ispy-app.herokuapp.com/

## How It's Made:
**Tech Used:** HTML, CSS, JS, PYTHON, REACT, DJANGO, POSTGRESQL

The first thing I needed to figure out in order to build this project was how I was going to host images online. After some research I decided to use Cloudinary because a simple ping of their API would return a url of the image hosted online. This is exactly what I needed for my project because a url string would be much easier to store in my postgresql database then an actual image and I needed an image url to send to my AI models as well. My React frontend was in charge of displaying the image that was uploaded and sending a post request to my cloudinary api. With the hosted url in hand my app could then run several different kinds of scans on the image. The first type of scan I built was object detection. A user can upload any image and the main object in the image will be detected and displayed. It can be a person, car, book, or even a hot dog. Yes, a hot dog. Any image scanned with object detection will actually return a string that says if the image includes a hot dog and if it doesn't, it will identify the main object in the picture regardless. I simply included a function within my code that returns a boolean after checking the object name being returned from the AI model. This is obviously a joke, but I could have easily checked for any item within an image. This idea is very powerful and I wanted to draw attention to it in a funny way. This kind of technology has real world applications like scanning images or video for prohibited items at a place of bussiness or airport.

My application also includes a facial detection feature that predicts the age, gender, and emotional profile of any head shot that is uploaded. The emotional profile generated returns a score from 0 to 1 for eight different emotions like happy, nervous, anger, etc... The closer the score is to 1 the more likely the model thinks that's the emotion being displayed in the picture.

The last two features are tag and adult content detection. Tag detection will scan an image and formulate tags, like key words and return a complete sentence describing what is happening in the picture. Adult content detection is exactly what it sounds like, it scans images for three things: adult content, racy content, and gory content. This scan returns a score for each from 0 to 1 as well. Numbers closer to 1 mean that image really displays those characteristics.

All four of these scans are built on top of Microsoft Azure's cognitive services models. The link to my app is above, check it out!

## Optimizations

If I had a little bit more time to spend on this project I would definitely refactor some of my frontend code. My React components are too big, but I didn't realize that until I was about halfway done with my application. I would also love to implement useLocation in React instead of having a different page for displaying and editing content. These two things would make my application a lot easier to read and build upon.

## Lessons Learned

One of the most important lessons I learned building this application I mentioned above, write smaller, more reusuable React components. That's the whole point of React. The second lesson I learned was the importance of managing complexity as your application grows. I need to be more systematic about the way I design, structure, and write my code. File organization and a structured approach to building fullstack web apps is pivotal to your success as a developer.

## Other Projects I've Built:

**Sorting Visualizer:** https://github.com/MrGmo/sortingVisualizer

**Yelp Clone:** https://github.com/MrGmo/Yelp-Clone
