import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalProps } from 'antd';
import { BottomSheetErrorMessage } from './bottom-sheet-error-message/bottom-sheet-error-message';
import * as S from './bottom-sheet.style';
import { DrawerProps } from 'antd/lib';
import { Nullable } from '@branch-services/types';
import { useResponsive } from '@branch-services/hooks';

type CustomDrawerProps = Omit<DrawerProps, 'title'>;
type CustomModalProps = Omit<ModalProps, 'title'>;

type BottomSheetProps = CustomDrawerProps &
  CustomModalProps & {
    isResizable?: boolean;
    onClose?: VoidFunction;
    initialHeight?: number;
    isModalView?: boolean;
    open?: boolean;
    error?: Nullable<Error>;
    reTryHandler?: VoidFunction;
    loading?: boolean;
    footer?: React.ReactNode;
    children: React.ReactNode;
    closable?: boolean;
  };

const MIN_HEIGHT = 300;

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isResizable = true,
  initialHeight,
  onClose,
  children,
  isModalView = false,
  open = false,
  error,
  reTryHandler,
  loading,
  footer,
  closable = false,
  ...prop
}) => {
  const { isMobileOrTablet } = useResponsive();
  const [maxHeight, setMaxHeight] = useState(600);
  const [height, setHeight] = useState(initialHeight ?? MIN_HEIGHT);
  const [closing, setClosing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const touchStartY = useRef<number | null>(null);
  const startHeight = useRef<number | null>(null);
  const renderAsModal = isModalView ?? !isMobileOrTablet;

  const lastDiff = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMaxHeight(window.innerHeight * 0.9);
    }
  }, []);

  const preventScroll = (e: WheelEvent | TouchEvent) => {
    const target = e.target as HTMLElement;
    if (!contentRef.current?.contains(target)) {
      e.preventDefault();
    }
  };

  const lastYRef = useRef(0);

  useEffect(() => {
    if (!(open && isMobileOrTablet)) return;

    const isScrollable = (el: HTMLElement | null) => {
      if (!el) return false;
      const style = window.getComputedStyle(el);
      const oy = style.overflowY;
      return (oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight;
    };

    const closestScrollContainer = (el: HTMLElement | null): HTMLElement | null => {
      let cur: HTMLElement | null = el;
      while (cur) {
        if (cur.classList?.contains('bs-scroll') || cur.classList?.contains('ant-modal-body') || isScrollable(cur)) {
          return cur;
        }
        cur = cur.parentElement;
      }
      return null;
    };

    const onTouchStart = (e: TouchEvent) => {
      lastYRef.current = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      const dy = y - lastYRef.current;
      lastYRef.current = y;

      const target = e.target as HTMLElement;
      const scroller = closestScrollContainer(target);

      if (!scroller) {
        e.preventDefault();
        return;
      }

      const atTop = scroller.scrollTop <= 0;
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;

      const goingDown = dy > 0;
      const goingUp = dy < 0;

      if (atTop && goingDown) {
        e.preventDefault();
        return;
      }
      if (atBottom && goingUp) {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', onTouchStart as any);
      document.removeEventListener('touchmove', onTouchMove as any);
    };
  }, [open, isMobileOrTablet]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (open) {
        setClosing(false);
        if (contentRef.current) {
          const footerHeight = footerRef.current?.getBoundingClientRect().height ?? 0;
          const contentHeight = footer
            ? contentRef.current.scrollHeight + 40 + footerHeight
            : contentRef.current.scrollHeight + 40;
          const newHeight = initialHeight ? Math.min(initialHeight, maxHeight) : Math.min(contentHeight, maxHeight);
          setHeight(newHeight);
        }
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [open, maxHeight, initialHeight, children]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    startHeight.current = height;
    lastDiff.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null || startHeight.current === null) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;

    lastDiff.current = diff;

    if (!isResizable && diff < 0) return;

    const newHeight = Math.max(MIN_HEIGHT, Math.min(startHeight.current - diff, maxHeight));
    setHeight(newHeight);
  };

  const startClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose?.();
      setClosing(false);
      setHeight(initialHeight ?? MIN_HEIGHT);
    }, 300);
  };

  const onTouchEnd = () => {
    if (touchStartY.current === null || startHeight.current === null) return;

    if (!isResizable) {
      if (height <= MIN_HEIGHT) {
        startClose();
      } else {
        setHeight(height);
      }
    } else {
      if (lastDiff.current > 30 || height <= MIN_HEIGHT) {
        startClose();
      } else {
        setHeight(maxHeight);
      }
    }

    touchStartY.current = null;
    startHeight.current = null;
    lastDiff.current = 0;
  };

  if (isMobileOrTablet && open) {
    return (
      <S.BottomSheetWrapper {...prop}>
        <S.Backdrop
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          visible={!closing}
          onClick={startClose}
        />
        <S.Container height={height} maxHeight={maxHeight} closing={closing}>
          <S.DragContainer onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <S.DragHandle />
          </S.DragContainer>
          <S.Body ref={contentRef}>
            {error ? (
              <BottomSheetErrorMessage message={error} loading={loading} reTryHandler={reTryHandler} />
            ) : (
              children
            )}
          </S.Body>
          {footer && <S.Footer ref={footerRef}>{footer}</S.Footer>}
        </S.Container>
      </S.BottomSheetWrapper>
    );
  }

  if (renderAsModal) {
    return (
      <Modal onCancel={onClose} open={open} centered closable={false} footer={footer} {...prop}>
        {children}
      </Modal>
    );
  }

  return null;
};
