const IMPORT_URL = 'http://localhost:8080/api/v1/recipes/import'

const importButton = document.getElementById('importButton')
const status = document.getElementById('status')

function setStatus(message, error = false) {
  status.textContent = message
  status.style.color = error ? '#c62828' : '#666'
}

async function getCurrentTab() {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  })

  if (!tabs.length || !tabs[0].id) {
    throw new Error('Could not determine the current tab.')
  }

  return tabs[0]
}

async function extractFromPage(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { type: 'EXTRACT_RECIPE' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message))
        return
      }

      if (!response) {
        reject(new Error('The page did not return any data.'))
        return
      }

      if (!response.ok) {
        reject(new Error(response.error || 'Extraction failed.'))
        return
      }

      resolve(response.data)
    })
  })
}

async function importRecipe() {
  importButton.disabled = true

  try {
    setStatus('Reading recipe page...')
    const tab = await getCurrentTab()
    const pageData = await extractFromPage(tab.id)

    if (!pageData.html) {
      throw new Error("Could not read this page's HTML.")
    }

    setStatus('Importing...')
    const response = await fetch(IMPORT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: pageData.url, html: pageData.html }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(text || `Import failed with HTTP ${response.status}`)
    }

    setStatus('Recipe imported successfully.')
  } catch (err) {
    setStatus(err instanceof Error ? err.message : String(err), true)
  } finally {
    importButton.disabled = false
  }
}

importButton.addEventListener('click', importRecipe)
