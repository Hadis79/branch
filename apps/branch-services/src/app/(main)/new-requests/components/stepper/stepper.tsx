import { useMemo } from 'react';
import { StepRoute } from '../../utils/enums';
import ValidationStep from '../validation-step/validation-step';
import FinalConfirmationStep from '../final-confirmation/final-confirmation-step';
import useNewRequestsWidgetStore from '../../store/use-widget-store';
import { useTr } from '@branch-services/translation';

function StepperComponent() {
  const [t] = useTr();
  const { step } = useNewRequestsWidgetStore();

  const steps = useMemo(
    () => [
      // {
      //   route: StepRoute.VALIDATION_STEP,
      //   title: t('اعتبارسنجی'),
      //   component: <ValidationStep />,
      // },
      {
        route: StepRoute.FINAL_CONFIRMATION,
        title: t('تأیید نهایی'),
        component: <FinalConfirmationStep />,
      },
    ],
    [t]
  );

  const currentStepIndex = steps.findIndex((s) => s.route === step);

  return (
    <>
      {/*<Steps progressDot={true} items={steps.map(({ route, title }) => ({ key: route, title }))}*/}
      {/*       current={currentStepIndex} responsive />*/}
      {steps?.[currentStepIndex]?.component}
    </>
  );
}

export default StepperComponent;
