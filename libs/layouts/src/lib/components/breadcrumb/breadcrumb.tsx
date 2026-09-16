import { BreadcrumbStyled } from './breadcrumb.style';
import { useTr } from '@branch-services/translation';
import { usePathname, useSearchParams } from 'next/navigation';
import { activeBackBtnOnPathname, ActiveBackBtnOnPathname } from '../../utils/consts';
import { useMemo } from 'react';

interface BreadcrumbProps {
  onBack?: () => void;
  activeOnPathname?: ActiveBackBtnOnPathname;
  headerTitle?: string;
}

const Breadcrumb = ({ onBack, activeOnPathname, headerTitle }: BreadcrumbProps) => {
  const [t] = useTr();
  const currentPathname = usePathname();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const paramsKeys = Array.from(searchParams.keys());
  const hasMatchingParams = useMemo(
    () => paramsKeys.some((key) => activeBackBtnOnPathname.searchParams.includes(key)),
    [paramsKeys]
  );

  function getDynamicBaseCrumbs() {
    const pathSegments = currentPathname.split('/').filter(Boolean);
    return pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const isLast = index === pathSegments.length - 1;
      return (
        <>
          {headerTitle && pathSegments?.length === 1 && searchParams.size === 0 && currentPathname !== '/cartable' && (
            <BreadcrumbStyled.Item key={href}>{t(headerTitle)}</BreadcrumbStyled.Item>
          )}

          <BreadcrumbStyled.Item key={href}>
            <span className={`${isLast && !step && currentPathname !== '/cartable' ? 'is-last-active' : ''}`}>
              {currentPathname.includes('create-request') && step === null ? t('submit') : t(segment)}
            </span>
          </BreadcrumbStyled.Item>
        </>
      );
    });
  }

  function generateCrumbs() {
    const baseCrumbs = getDynamicBaseCrumbs();

    if (step) {
      baseCrumbs.push(
        <BreadcrumbStyled.Item key={`${currentPathname}?step=${step}`}>
          <span className='is-last-active'>{t(step)}</span>
        </BreadcrumbStyled.Item>
      );
    }

    return baseCrumbs;
  }

  return (
    <BreadcrumbStyled>
      {generateCrumbs()}
      {(activeOnPathname?.pathnames?.includes(currentPathname) ||
        hasMatchingParams ||
        step === activeOnPathname?.searchParamValues[0] ||
        step === activeBackBtnOnPathname?.searchParamValues[1]) &&
        onBack && (
          <div className='go-back-button-container' onClick={onBack}>
            <div className='go-back-button'>
              <span className='breadcrumb-action-button'>{t('button.return')}</span>
              <i className='ri-arrow-left-line'></i>
            </div>
          </div>
        )}
    </BreadcrumbStyled>
  );
};

export default Breadcrumb;
