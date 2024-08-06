'use client'
import React from 'react'
import CountUp from 'react-countup'
type props={
    amount:number
}

const AnimatedCounter = ({amount}:props) => {
  return (
    <div className='w-full'>
      
      <CountUp 
      decimal='.'
      prefix='₹'
      duration={0.75}
      decimals={2}
      end={amount} 
      />
      
    </div>
  )
}

export default AnimatedCounter
