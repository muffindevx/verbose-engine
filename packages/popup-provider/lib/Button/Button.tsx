import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ children, className, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type="button"
      {...props}
      className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${className}`}
    >
      {children}
    </button>
  );
}
