function extractPageData() {
  return {
    url: window.location.href,
    title: document.title,
    html: document.documentElement.outerHTML,
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== 'EXTRACT_RECIPE') {
    return
  }

  try {
    const data = extractPageData()

    sendResponse({
      ok: true,
      data,
    })
  } catch (err) {
    sendResponse({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    })
  }

  return true
})

// oxlint-disable-next-line no-console
console.log('[Recipe Importer] content script loaded:', location.href)
