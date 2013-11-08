---
tags:
  - idea
  - design
  - content
  - quora
title: Soft limits and meaningful content cuts
---

On [Quora](http://www.quora.com), and many other websites, long answers are cut off with a "(more)" button/link which immediately displays the rest of the answer in-place. The cut-off threshold seems to be a hard limit on words or characters. Sometimes it works:

![Answer #1 cut off](http://i.imgur.com/qTo4xiS.png)

![Answer #1 expanded, at least another page of content](http://i.imgur.com/XIXtSjs.png)

Sometimes it seems a bit silly to just hide this little content:

![Answer #2 cut off](http://i.imgur.com/3ZCCZde.png)

![Answer #2 expanded, only ~100px have been added](http://i.imgur.com/2s4bKQp.png)

***

I think there is a way to make this better:

- __Use height, not length.__ Especially in this context! Length only has meaning if it is directly correlated to height, as is the case with block of text without breaks. Images make the height grow by a huge factor, as a link only a few dozen characters long can add hundreds of pixels.

- __Use a soft limit.__ Instead of cutting at a hard, say, 800px, put an error margin on there, say ±100px. Thus, if the content is 850px high, don't cut it off, but if it is 1000px high, do.

- __Make cuts more meaningful.__ Given the above rule, consider this: the cut-off is at 800±100px, and the content height is 905px. In this case, the cut-off would be at 800px, leaving a measly 105px below the fold. Avoid situations like this by moving the cut-off to make below-the-fold content more meaningful, e.g. at least 250px. Here, we would have a final cut-off at 655px.

- __"But computing height is difficult server-side, and we don't want to do it client-side!"__ No it's not. You don't need to render the page to calculate height. Yes, it's more precise, but you can estimate it fairly easily, especially if you have good control over your styles.
  
  For text: you know what your font-size is. You have a good amount of content so you can easily compute (once!) the average number of words per line. You can easily count the number of line breaks and line rules. Thus you can quickly estimate the total text height.
  
  For images: either take the same route and compute (once) the average height of images, or compute it per-image (maybe you host images, and create thumbs + metadata to be able to optimise loading times; in that case you could put the image height straight from your own service).
  
  Combining both, you can obtain an estimate of the content height of any given article or text, and apply cut-offs then. And of course, the results can be cached!

(Screenshots are from [this Quora article](http://www.quora.com/Countries/What-do-you-think-every-foreigner-should-know-about-your-country), which you should really have a look at, at least just for the beautiful images of the world.)
