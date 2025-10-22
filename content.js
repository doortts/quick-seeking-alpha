// Default configuration
const DEFAULT_CONFIG = {
  enabled: true,
  patterns: ['/article', '/market-news'],
  postfix: '?utm_source=nh&utm_medium=referral&feed_item_type=article'
};

let config = { ...DEFAULT_CONFIG };

// Load configuration from storage
function loadConfig(callback) {
  chrome.storage.sync.get(['enabled', 'patterns', 'postfix'], (result) => {
    config.enabled = result.enabled !== undefined ? result.enabled : DEFAULT_CONFIG.enabled;
    config.patterns = result.patterns || DEFAULT_CONFIG.patterns;
    config.postfix = result.postfix || DEFAULT_CONFIG.postfix;

    if (callback) callback();
  });
}

// Check if a URL matches any of the configured patterns
function shouldModifyLink(href) {
  if (!href || !config.enabled) return false;

  try {
    const url = new URL(href, window.location.origin);

    // Only process links on the same domain
    if (!url.hostname.includes('seekingalpha.com')) return false;

    // Check if pathname starts with any configured pattern
    return config.patterns.some(pattern => url.pathname.startsWith(pattern));
  } catch (e) {
    return false;
  }
}

// Modify a single link
function modifyLink(link) {
  const href = link.getAttribute('href');
  if (!shouldModifyLink(href)) return;

  try {
    const url = new URL(href, window.location.origin);

    // Extract the first parameter from postfix to check if it already exists
    const postfixParams = config.postfix.startsWith('?')
      ? config.postfix.substring(1)
      : config.postfix;
    const firstParam = postfixParams.split('&')[0].split('=')[0];

    // Check if the first parameter from postfix already exists
    if (url.searchParams.has(firstParam)) {
      link.dataset.utmProcessed = 'true';
      return;
    }

    // Remove hash fragment (#...) from URL
    let baseHref = href;
    const hashIndex = baseHref.indexOf('#');
    if (hashIndex !== -1) {
      baseHref = baseHref.substring(0, hashIndex);
    }

    // Add postfix
    let newHref;
    if (url.search) {
      // Already has query parameters
      newHref = baseHref + '&' + postfixParams;
    } else {
      // No query parameters yet
      newHref = baseHref + '?' + postfixParams;
    }

    link.setAttribute('href', newHref);

    // Mark as processed to avoid reprocessing
    link.dataset.utmProcessed = 'true';

    // Force open in new tab - use click event listener
    // Remove any existing click handlers that might interfere
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.open(this.href, '_blank', 'noopener,noreferrer');
    }, true);
  } catch (e) {
    console.error('[SA Link Modifier] Error modifying link:', e);
  }
}

// Process all links on the page
function processAllLinks() {
  if (!config.enabled) return;

  const links = document.querySelectorAll('a[href]:not([data-utm-processed])');
  links.forEach(link => modifyLink(link));
}

// Observer for dynamically added content
const observer = new MutationObserver((mutations) => {
  if (!config.enabled) return;

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Check if the node itself is a link
        if (node.tagName === 'A' && !node.dataset.utmProcessed) {
          modifyLink(node);
        }
        // Check for links within the added node
        const links = node.querySelectorAll ? node.querySelectorAll('a[href]:not([data-utm-processed])') : [];
        links.forEach(link => modifyLink(link));
      }
    });
  });
});

// Listen for configuration changes
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    let configChanged = false;

    if (changes.enabled) {
      config.enabled = changes.enabled.newValue;
      configChanged = true;
    }
    if (changes.patterns) {
      config.patterns = changes.patterns.newValue;
      configChanged = true;
    }
    if (changes.postfix) {
      config.postfix = changes.postfix.newValue;
      configChanged = true;
    }

    if (configChanged) {
      // Clear processed markers and reprocess all links
      document.querySelectorAll('a[data-utm-processed]').forEach(link => {
        delete link.dataset.utmProcessed;
      });
      processAllLinks();
    }
  }
});

// Initialize extension
function initialize() {
  processAllLinks();

  // Start observing DOM changes for dynamically loaded content
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Load configuration and start
loadConfig(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
});
