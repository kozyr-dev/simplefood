'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

function patchHistoryMethod(method: 'pushState' | 'replaceState') {
  const original = history[method]
  history[method] = function (...args) {
    NProgress.start()
    return original.apply(this, args)
  }
}

export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    patchHistoryMethod('pushState')
    patchHistoryMethod('replaceState')

    const handlePopState = () => NProgress.start()
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  return null
}
