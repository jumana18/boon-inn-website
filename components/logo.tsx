import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-baseline gap-2 font-serif leading-none', className)}>
      <span className="font-medium tracking-tight">Boon</span>
      <span
        aria-hidden
        className="inline-block h-1 w-1 translate-y-[-0.15em] rounded-full bg-brass"
      />
      <span className="font-light italic tracking-tight">Inn</span>
    </span>
  )
}
