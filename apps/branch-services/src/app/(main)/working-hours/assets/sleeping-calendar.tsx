import React from 'react';

// Stand-in for the design's "sleeping calendar" illustration; same palette as the other assets.
// Replace with the exported design SVG once it's available.
const SleepingCalendarSvg = () => {
  return (
    <svg width='84' height='58' viewBox='0 0 84 58' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='44' cy='30' r='27' fill='#F1FAF9' stroke='#D5E4E5' strokeWidth='1.5' />
      <path
        d='M22 14C22 12.3431 23.3431 11 25 11H63C64.6569 11 66 12.3431 66 14V52C66 53.6569 64.6569 55 63 55H25C23.3431 55 22 53.6569 22 52V14Z'
        fill='white'
        stroke='#D5E4E5'
        strokeWidth='1.5'
      />
      <path
        d='M22.75 14C22.75 12.7574 23.7574 11.75 25 11.75H63C64.2426 11.75 65.25 12.7574 65.25 14V22H22.75V14Z'
        fill='#F1FAF9'
      />
      <path d='M22 22H66' stroke='#D5E4E5' strokeWidth='1.5' />
      <path d='M34 7V15' stroke='#AAC3C5' strokeWidth='2.5' strokeLinecap='round' />
      <path d='M54 7V15' stroke='#AAC3C5' strokeWidth='2.5' strokeLinecap='round' />
      <path d='M30 44H58M30 49H58M36.5 39V54M44 39V54M51.5 39V54' stroke='#EEF3F3' strokeWidth='1' />
      <path d='M34 30C35.5 32 38.5 32 40 30' stroke='#AAC3C5' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M48 30C49.5 32 52.5 32 54 30' stroke='#AAC3C5' strokeWidth='1.5' strokeLinecap='round' />
      <circle cx='44' cy='36' r='1.5' fill='#AAC3C5' />
      <path d='M3 3H12L3 14H12' stroke='#D5E4E5' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14 17H20L14 24H20' stroke='#D5E4E5' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export default SleepingCalendarSvg;
