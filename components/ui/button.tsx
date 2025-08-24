import * as React from 'react'
import { cn } from './utils'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button = React.forwardRef<HTMLButtonElement, Props>(function Button({ className, ...props }, ref) {
  return (
    <button ref={ref} className={cn('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gray-900 text-white hover:opacity-90', className)} {...props} />
  )
})
