'use client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React from 'react';

// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './index.css';

type PaginationItemPropsType = {
  isActive?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const PaginationItem = ({
  className = '',
  children,
  disabled = false,
  onClick,
}: PaginationItemPropsType): React.ReactNode => {
  return (
    <button
      className={clsx(
        'fluent-pagination__item',
        {
          'fluent-pagination__item--disabled': disabled,
        },
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const buildHref = (page: number) => (page === 1 ? '/' : `/posts/${page}`);

export type PaginationPropsType = {
  current: number;
  total: number;
};

export const Pagination: React.FC<PaginationPropsType> = ({ current, total }) => {
  const router = useRouter();

  const go = (page: number) => {
    if (page === current) return;
    if (page < 1 || page > total) return;
    router.push(buildHref(page));
  };

  return (
    <div className="fluent-pagination">
      <PaginationItem onClick={() => go(current - 1)}>
        <span className="i-fluent:chevron-left-20-filled inline-flex w-20 h-20 m-S" />
      </PaginationItem>
      {Array.from({ length: total }).map((_, index) => (
        <PaginationItem onClick={() => go(index + 1)} disabled={current === index + 1}>
          {index + 1}
        </PaginationItem>
      ))}
      <PaginationItem onClick={() => go(current + 1)}>
        <span className="i-fluent:chevron-right-20-filled inline-flex w-20 h-20 m-S" />
      </PaginationItem>
    </div>
  );
};
