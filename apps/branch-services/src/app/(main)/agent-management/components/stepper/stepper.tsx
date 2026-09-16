import { useMemo } from 'react';
import { StepRoute } from '../../utils/enums';
import { useTr } from '@branch-services/translation';
import useAgentManagementWidgetStore from '../../store/use-widget-store';
import OrganizationId from './organization-id-step/organization-id';
import NationalId from './national-id-step/national-id';
import FinalConfirmationStep from './final-confirmation/final-confirmation-step';

function StepperComponent() {
  const [t] = useTr();
  const { step } = useAgentManagementWidgetStore();

  const steps = useMemo(
    () => [
      {
        route: StepRoute.NATIONAL_ID,
        title: t('کد ملی'),
        component: <NationalId />,
      },
      {
        route: StepRoute.ORGANIZATION_ID,
        title: t('شناسه ملی'),
        component: <OrganizationId />,
      },
      {
        route: StepRoute.CONFIRMATION,
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
