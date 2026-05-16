import { useMagnetic } from '@/hooks/useMagnetic'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function MagneticButton({ className, children, ...props }: ButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.3)

  return (
    <Button
      ref={ref}
      className={cn('transition-transform duration-200', className)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Button>
  )
}
