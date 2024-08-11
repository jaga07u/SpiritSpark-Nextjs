import React from 'react'
import Couplet from './Couplet'
import Quote from './Quote'
import Poem from './Poem'
import Story from './Story'


function Home2({Mode,lang}) {
   if(Mode === "couplet"){
    return (
        <>
        <Couplet/>
        </>
    )
   }
   if(Mode === "quote"){
    return (
        <>
        <Quote/>
        </>
    )
   }
   if(Mode === "poem"){
    return (
        <>
        <Poem/>
        </>
    )
   }
   if(Mode === "story"){
    return (
        <>
        <Story/>
        </>
    )
   }
}

export default Home2
