import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { BasicComponentProps, Direction, SubErrorType } from '@branch-services/types';
import { useAppTheme } from '@branch-services/hooks';
import { uuid } from '@branch-services/utils';

import { StyledContainer, ToggleButton } from './message-box.style';
import Link from 'next/link';
import { AlertProps } from '../alert/alert';
import { useTr } from '@branch-services/translation';
import { useRouter } from 'next/navigation';

type LinkTargetType = '_self' | '_blank';

export type MessageBoxProps = BasicComponentProps &
  AlertProps & {
    // message?: string;
    // kind?: MessageKindType;
    // dismissible?: boolean;
    linkProps?: {
      title: string;
      url: string;
      target?: LinkTargetType;
      icon?: ReactNode;
      samePath?: boolean;
    };
    subErrors?: SubErrorType[];
    shouldScroll?: boolean;
    once?: boolean;
    margin?: string /*import('csstype').Property.Margin<string | number> | undefined*/;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
  };

export type I$MessageBoxProps = MessageBoxProps;

export const MessageBox: React.FC<I$MessageBoxProps> = (props) => {
  const {
    linkProps,
    shouldScroll = false,
    margin = '0',
    once = false,
    showIcon = true,
    children,
    description,
    subErrors = [],
    onClose,
    ...rest
  } = props;

  const [t] = useTr();

  const theme = useAppTheme();

  const router = useRouter();

  const mainRef = useRef<HTMLDivElement>(null);

  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (shouldScroll && props.message) {
      setTimeout(() => {
        mainRef?.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        // window.scroll(0,mainRef.current.offsetTop);
      }, 200);
    }
  }, [props.message, shouldScroll]);

  if (!props.message || props.message.toString().trim().length === 0) {
    return null;
  }

  function generateLink() {
    if (!linkProps) return null;

    const { title = '', url = '#', target = '_self', icon, samePath = false } = linkProps;

    const handleLinkClick = (e) => {
      // Check if the clicked URL is the same as the current URL
      if (samePath) {
        window.location.reload();
      }
    };

    const _icon =
      icon ??
      (theme.direction === Direction.LTR ? (
        <i className={'ri-arrow-right-s-line'} />
      ) : (
        <i className={'ri-arrow-left-s-line'} />
      ));
    return (
      <Link
        className='message-box__link'
        href={url}
        target={target}
        onClick={handleLinkClick}
        style={{ color: theme.primary }}
      >
        {title}

        <span>{_icon}</span>
      </Link>
    );
  }

  function renderSubErrors() {
    const visibleErrors = isCollapsed ? subErrors : subErrors?.slice(0, 4);

    return (
      <ul className={`message-box__sub-errors ${isCollapsed ? 'expanded' : ''}`}>
        {visibleErrors?.map((error, index) => (
          <li className='message-box__sub-error-item' key={index}>
            {error.localizedMessage}
          </li>
        ))}
      </ul>
    );
  }

  function generateSubErrors() {
    if (subErrors && subErrors.length > 0) {
      return (
        <>
          {renderSubErrors()}
          {subErrors.length > 4 && (
            <ToggleButton className='message-box__toggle-btn' onClick={() => setIsCollapsed(!isCollapsed)}>
              <span className='message-box__toggle-btn-text'>
                {isCollapsed ? t('button.show_less') : t('button.show_more')}
              </span>
              {isCollapsed ? <i className='ri-arrow-up-s-line'></i> : <i className='ri-arrow-down-s-line'></i>}
            </ToggleButton>
          )}
        </>
      );
    }
  }

  function generateDescription() {
    return (
      <>
        {description}
        {children}
        {generateLink()}
        {generateSubErrors()}
      </>
    );
  }

  function handleDismiss(e) {
    // setVisible(false);
    if (onClose) {
      onClose(e);
    }
  }

  return (
    <div ref={mainRef} style={{ margin: margin }} id={`message-box-${uuid()}`}>
      <StyledContainer showIcon={showIcon} description={generateDescription()} onClose={handleDismiss} {...rest} />
    </div>
  );
};
