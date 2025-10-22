// Default configuration
const DEFAULT_CONFIG = {
  enabled: true,
  patterns: ['/article', '/market-news'],
  postfix: '?utm_source=nh&utm_medium=referral&feed_item_type=article'
};

// DOM elements
let enabledToggle;
let patternInput;
let addPatternBtn;
let patternList;
let postfixInput;
let saveBtn;
let resetBtn;
let statusMessage;

// Current configuration
let currentConfig = { ...DEFAULT_CONFIG };

// Initialize DOM references
function initializeElements() {
  enabledToggle = document.getElementById('enabledToggle');
  patternInput = document.getElementById('patternInput');
  addPatternBtn = document.getElementById('addPatternBtn');
  patternList = document.getElementById('patternList');
  postfixInput = document.getElementById('postfixInput');
  saveBtn = document.getElementById('saveBtn');
  resetBtn = document.getElementById('resetBtn');
  statusMessage = document.getElementById('statusMessage');
}

// Load settings from storage
function loadSettings() {
  chrome.storage.sync.get(['enabled', 'patterns', 'postfix'], (result) => {
    currentConfig.enabled = result.enabled !== undefined ? result.enabled : DEFAULT_CONFIG.enabled;
    currentConfig.patterns = result.patterns || DEFAULT_CONFIG.patterns;
    currentConfig.postfix = result.postfix || DEFAULT_CONFIG.postfix;

    updateUI();
  });
}

// Update UI with current settings
function updateUI() {
  enabledToggle.checked = currentConfig.enabled;
  postfixInput.value = currentConfig.postfix;
  renderPatternList();
}

// Render the pattern list
function renderPatternList() {
  patternList.innerHTML = '';

  currentConfig.patterns.forEach((pattern, index) => {
    const li = document.createElement('li');
    li.className = 'pattern-item';

    const span = document.createElement('span');
    span.className = 'pattern-text';
    span.textContent = pattern;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deletePattern(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    patternList.appendChild(li);
  });

  // Show empty state if no patterns
  if (currentConfig.patterns.length === 0) {
    const emptyState = document.createElement('li');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No patterns configured. Add a pattern to get started.';
    patternList.appendChild(emptyState);
  }
}

// Add a new pattern
function addPattern() {
  const pattern = patternInput.value.trim();

  if (!pattern) {
    showStatus('Please enter a pattern', 'error');
    return;
  }

  if (!pattern.startsWith('/')) {
    showStatus('Pattern must start with /', 'error');
    return;
  }

  if (currentConfig.patterns.includes(pattern)) {
    showStatus('Pattern already exists', 'error');
    return;
  }

  currentConfig.patterns.push(pattern);
  patternInput.value = '';
  renderPatternList();
  showStatus('Pattern added (remember to save)', 'info');
}

// Delete a pattern
function deletePattern(index) {
  currentConfig.patterns.splice(index, 1);
  renderPatternList();
  showStatus('Pattern removed (remember to save)', 'info');
}

// Save settings
function saveSettings() {
  currentConfig.enabled = enabledToggle.checked;
  currentConfig.postfix = postfixInput.value.trim();

  if (!currentConfig.postfix) {
    showStatus('Postfix cannot be empty', 'error');
    return;
  }

  chrome.storage.sync.set({
    enabled: currentConfig.enabled,
    patterns: currentConfig.patterns,
    postfix: currentConfig.postfix
  }, () => {
    showStatus('Settings saved successfully!', 'success');
  });
}

// Reset to defaults
function resetToDefaults() {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    currentConfig = { ...DEFAULT_CONFIG };
    updateUI();
    showStatus('Settings reset to defaults (remember to save)', 'info');
  }
}

// Show status message
function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
  statusMessage.style.display = 'block';

  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 3000);
}

// Event listeners
function setupEventListeners() {
  addPatternBtn.addEventListener('click', addPattern);
  patternInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addPattern();
    }
  });

  saveBtn.addEventListener('click', saveSettings);
  resetBtn.addEventListener('click', resetToDefaults);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeElements();
  setupEventListeners();
  loadSettings();
});
