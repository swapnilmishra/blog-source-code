---
title: Mobx style observers
date: "2017-02-03"
layout: post
path: "/mobx-style-observers/"
category: "Javascript"
description: "A very basic MobX style Observer"
---


A very basic [MobX](https://github.com/mobxjs/mobx) style Observers. This is not even scratching the surface w.r.t the actual library as there are so many other things involved in building the whole thing.

This is to just give an idea on how things work in data binding libraries.

[JSbin](https://jsbin.com/xiciqa/edit?html,js,console) link for the code.

```js
const SwapX = {
  /*
  ** This function receives all the properties which need to be observed for changes.
  ** It just wraps all the properties with setter and getter function so that we have
  ** control over it.
  ** Now whenver a property is modified we check if the value is same or not.
  ** If the value is same we don't do anything, if the value is changed we call autorun function.
  */
  observable : function observable(props){
    const _parent = this;
    let obj = {}, prop;
    const keys = Object.keys(props)
    for(let i=0; i < keys.length; i++){
       prop = keys[i];
       (function (prop){
         Object.defineProperty(obj,prop,{
          get: function(){
            return (this.value || props[prop] )
          },
          set: function(value){
            if(value !== this.value){
              this.value = value;
              _parent.markDirty(prop)
              _parent.run()
            }
          }
         })
       })(prop)
    }
    return obj
  },
  
  dirty : [], // holds the properties which got modified
  
  // autorun gets called whenever a property is modified
  autorun : function (callback){
    this.run = callback;
  },

  // gets called to mark a property dirty
  markDirty(prop) {
    this.dirty.push(prop)
  }
}

const appState = SwapX.observable({
  count : 2,
  name : 'Swapnil'
})

SwapX.autorun(function(){
  console.log('Changed properties',SwapX.dirty)
})
```

This code right now works for object where values are primitive, to make it work for reference type we will to write few wrappers so that can detect their change. e.g wrapper for array so that when a value is pushed in an array through the wrapper function we can invoke autorun.