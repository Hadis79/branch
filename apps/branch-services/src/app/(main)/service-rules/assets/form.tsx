import type { SVGProps } from 'react';
import { useId } from 'react';

type FormSVGProps = SVGProps<SVGSVGElement>;

const FormSVG = (props: FormSVGProps) => {
  // Unique IDs prevent conflicts when multiple instances are rendered.
  const instanceId = useId().replace(/:/g, '');
  const filterId = `form-filter-${instanceId}`;
  const maskId = `form-mask-${instanceId}`;
  const gradientId = `form-gradient-${instanceId}`;

  return (
    <svg
      width='166'
      height='170'
      viewBox='0 0 166 170'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label='Form'
      {...props}
    >
      <path
        d='M83 166C128.84 166 166 128.84 166 83C166 37.1604 128.84 0 83 0C37.1604 0 0 37.1604 0 83C0 128.84 37.1604 166 83 166Z'
        fill='#007A7F'
        fillOpacity='0.08'
      />

      <g filter={`url(#${filterId})`}>
        <mask id={maskId} style={{ maskType: 'alpha' }} maskUnits='userSpaceOnUse' x='0' y='0' width='166' height='166'>
          <path
            d='M83 166C128.84 166 166 128.84 166 83C166 37.1604 128.84 0 83 0C37.1604 0 0 37.1604 0 83C0 128.84 37.1604 166 83 166Z'
            fill={`url(#${gradientId})`}
          />
        </mask>

        <g mask={`url(#${maskId})`}>
          <path
            d='M130.588 47.5859H35.4142C32.3582 47.5859 29.8809 50.0633 29.8809 53.1193V169.319C29.8809 172.375 32.3582 174.853 35.4142 174.853H130.588C133.644 174.853 136.121 172.375 136.121 169.319V53.1193C136.121 50.0633 133.644 47.5859 130.588 47.5859Z'
            fill='white'
          />
        </g>
      </g>

      <path
        d='M73.0406 58.6543H44.2673C42.4337 58.6543 40.9473 60.1407 40.9473 61.9743C40.9473 63.8079 42.4337 65.2943 44.2673 65.2943H73.0406C74.8742 65.2943 76.3606 63.8079 76.3606 61.9743C76.3606 60.1407 74.8742 58.6543 73.0406 58.6543Z'
        fill='#007A7F'
        fillOpacity='0.08'
      />

      <path
        d='M73.0406 105.133H44.2673C42.4337 105.133 40.9473 106.619 40.9473 108.453C40.9473 110.286 42.4337 111.773 44.2673 111.773H73.0406C74.8742 111.773 76.3606 110.286 76.3606 108.453C76.3606 106.619 74.8742 105.133 73.0406 105.133Z'
        fill='#007A7F'
        fillOpacity='0.08'
      />

      <path
        d='M119.521 75.2539H46.4814C44.0366 75.2539 42.0547 77.2358 42.0547 79.6806V90.7472C42.0547 93.192 44.0366 95.1739 46.4814 95.1739H119.521C121.966 95.1739 123.948 93.192 123.948 90.7472V79.6806C123.948 77.2358 121.966 75.2539 119.521 75.2539Z'
        stroke='#007A7F'
        strokeWidth='2.21333'
      />

      <path
        d='M119.521 120.627H46.4806C43.4246 120.627 40.9473 123.104 40.9473 126.16V135.014C40.9473 138.07 43.4246 140.547 46.4806 140.547H119.521C122.577 140.547 125.054 138.07 125.054 135.014V126.16C125.054 123.104 122.577 120.627 119.521 120.627Z'
        fill='#99CACC'
      />

      <path
        d='M58.6532 35.4139C61.098 35.4139 63.0799 33.432 63.0799 30.9872C63.0799 28.5424 61.098 26.5605 58.6532 26.5605C56.2084 26.5605 54.2266 28.5424 54.2266 30.9872C54.2266 33.432 56.2084 35.4139 58.6532 35.4139Z'
        fill='white'
      />

      <path
        d='M83.0009 35.4139C85.4457 35.4139 87.4276 33.432 87.4276 30.9872C87.4276 28.5424 85.4457 26.5605 83.0009 26.5605C80.5561 26.5605 78.5742 28.5424 78.5742 30.9872C78.5742 33.432 80.5561 35.4139 83.0009 35.4139Z'
        fill='#007A7F'
      />

      <path
        d='M107.347 35.4139C109.791 35.4139 111.773 33.432 111.773 30.9872C111.773 28.5424 109.791 26.5605 107.347 26.5605C104.902 26.5605 102.92 28.5424 102.92 30.9872C102.92 33.432 104.902 35.4139 107.347 35.4139Z'
        fill='white'
      />

      <defs>
        <filter
          id={filterId}
          x='23.2409'
          y='37.6259'
          width='119.52'
          height='131.694'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />

          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />

          <feOffset dy='-3.32' />
          <feGaussianBlur stdDeviation='3.32' />

          <feColorMatrix type='matrix' values='0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0' />

          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow' />

          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
        </filter>

        <linearGradient id={gradientId} x1='83' y1='0' x2='83' y2='166' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#E3ECFA' />
          <stop offset='1' stopColor='#DAE7FF' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default FormSVG;
