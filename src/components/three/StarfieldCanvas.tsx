import { Suspense, lazy } from 'react'

const StarfieldInner = lazy(() =>
  import('./StarfieldInner').then((m) => ({ default: m.StarfieldInner }))
)

export function StarfieldCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Suspense fallback={null}>
        <StarfieldInner />
      </Suspense>
    </div>
  )
}
