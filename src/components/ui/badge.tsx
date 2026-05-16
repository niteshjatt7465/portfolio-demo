import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' &&
          'bg-cyan-500/10 text-cyan-300 border border-cyan-400/20',
        variant === 'outline' && 'border border-white/10 text-zinc-400',
        className
      )}
      {...props}
    />
  )
}
