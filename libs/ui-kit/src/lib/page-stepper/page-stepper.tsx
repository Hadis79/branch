import React, { ReactNode } from 'react';
import { ScrollToTop } from '../scroll-to-top/scroll-to-top';

export type StepItemType = {
  id?: any;
  component?: ReactNode;
};

type PageStepperProps = {
  steps?: StepItemType[];
  active?: StepItemType['id'];
};

export const PageStepper = ({ steps, active }: PageStepperProps) => {
  return (
    <>
      {steps?.map((step) => (
        <React.Fragment key={step.id}>
          {step.id === active && (
            <>
              <ScrollToTop />
              {step.component}
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
};
