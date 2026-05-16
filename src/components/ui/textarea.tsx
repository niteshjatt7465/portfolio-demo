import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      'flex min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-cyan-400/20 resize-none',
      className
    )}
    ref={ref}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }
