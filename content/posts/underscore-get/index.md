---
title: Coding underscore get
date: "2017-01-30"
layout: post
path: "/underscore-get/"
category: "Javascript"
description: "We often use _.get() function to safely retreive the properties inside deeply nested objects. I have seen codebases where underscore was put in just because of this great utility function. So just thought of coding it and turns out its pretty easy and fun."
---


We often use ```_.get()``` function to safely retreive the properties inside deeply nested objects. I have seen codebases where underscore was put in just because of this great utility function. So just thought of coding it and turns out its pretty easy. Below is the code to do it with comments.

```js
var underscore = {
  // @param objStr : dotted properties string e.g 'name.firstname.text'
  // @param targetObj : Object from which we need to extract the properties
  get : function get(objStr,targetObj){
  
    var i =0
    var keys = objStr.split('.') // split the keys by '.' character
    var obj;
    for(; i < keys.length; i++){
      if(!obj && i===0)
        obj = targetObj[keys[i]] // for first key get the value from the object
      else if(obj && obj[keys[i]])
        obj = obj[keys[i]] // for other keys get the value from the object formed so far
      else {
        obj = undefined // if object[keys[i]] is undefined break the loop as going ahead script will throw error as undefined[undefined] is error
        break;
      }

    }
  
    return obj // return the final object
  }
  
}
```

You can test it by passing arbitrary properties and will work fine thereby returning undefined.