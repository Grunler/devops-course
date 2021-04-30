# Feedback for "How to setup a CI/CD pipeline for a react application", part 2:

## Feedback member:

Daniel Grünler (grunler@kth.se)

GitHub: [@Grunler](https://github.com/Grunler)

## Overall impression:

I enjoyed reading and executing this tutorial. I had not used Heroku or CircleCI before but apart from some unfortunate error on the CircleCI side I had no issue following the tutorial and I enjoyed learning something new.

The executable tutorial is a well-written and streamlined take on an interesting and useful subject. By focusing on a simple case and assuming that the reader is already familiar with using the command line and Github you avoid getting side tracked. This makes for a short tutorial that is easy to follow given those assumptions. I can imagine that the tutorial would be hard to follow for those who are not used to using Github and in particular initializing a local repo and pushing it to Github. Overall I think your approach was correct but you could add some additional links and clarifications in some places. Additionally there are some minor things that you could fix and improve upon. I’ll comment on these in more detail below.


### Time estimate and Overview

The estimated time seems optimistic. The tutorial is short but due to build times and some account setup I would estimate it at 20 minutes at a minimum.

The overview is short and to the point. I would not remove or add anything to it. The only minor suggestions I have is to capitalize the R in React and to fix the typo on Heroku.

### Introduction to CI/CD

The introduction to CI/CD also looks good to me. There is no need for a more thorough explanation in an executable tutorial like this and your explanation is sufficient for those with minimal knowledge of the terms to get an idea of what they mean. 


### Prerequisites

I would add “access to a UNIX computer” or similar to the list of prerequisites as the tutorial requires a UNIX terminal to follow. I appreciate that you included links to npm and Heroku to make the setup quicker. Finally I would suggest changing the title from “Prerequisite” to “Prerequisites”.

### Step 1 — Set up a react application

The instructions in this section were very simple to follow. The most complex part would be pushing the local files to a Github repo and it is not explained at all in the section. I understand why you would want to keep it outside the scope of the tutorial so as to not get sidetracked, but you could always link a resource such as this one:
https://kbroman.org/github_tutorial/pages/init.html

You could also consider changing the tutorial slightly by asking the reader to create the Github project themselves and cloning it locally at the start of the first step.


### Step 2: 

I would suggest that you include the contents of the .yml file as text as a compliment to the photo. There are multiple good reasons for doing so. The photo might be down or not able to be displayed for some reason and it makes it easier to copy the contents and it makes it easier for sight impaired readers to follow the tutorial. Another option is to add alternative text to the image.

Here are a couple useful links:
https://www.w3.org/WAI/tutorials/images/textual/#image-of-styled-text-with-decorative-effect
https://medium.com/gobeyond-ai/adding-alt-tags-to-images-on-medium-563d6d31130a

You could consider adding alternative text to all images but this one is the most important in my opinion.


### Step 3: Connect to CircleC
This section is great, clear and with a lot of images. I originally had some issues such as one image missing and there not being a link to the CircleCI website (the link was in step two when it was not needed). Both these issues have already been fixed while I’m writing this feedback!

### Step 4: Connect Heroku and deploy app

This section was also very clear and it was easy to follow.

### Conclusion

Your final remarks for the tutorial were suitable as you summed it up and encouraged the reader to proceed to take more steps on their journey to automation. 
