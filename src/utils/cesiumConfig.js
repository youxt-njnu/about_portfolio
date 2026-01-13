/**
 * Global Cesium configuration utilities
 */

/**
 * Fixes Cesium InfoBox iframe sandbox warnings globally
 * This observer watches for any Cesium InfoBox iframes and automatically
 * sets proper sandbox permissions to prevent console errors
 */
export const initCesiumInfoBoxFix = () => {
  const observer = new MutationObserver(() => {
    const iframes = document.querySelectorAll('.cesium-infoBox-iframe')
    iframes.forEach((iframe) => {
      if (!iframe.hasAttribute('data-sandbox-fixed')) {
        iframe.setAttribute(
          'sandbox',
          'allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation'
        )
        iframe.setAttribute('data-sandbox-fixed', 'true')
      }
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
  return observer // Return for cleanup if needed
}

/**
 * Initialize all Cesium global configurations
 */
export const initCesiumConfig = () => {
  // Fix InfoBox iframe sandbox issues
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCesiumInfoBoxFix)
  } else {
    initCesiumInfoBoxFix()
  }
}
