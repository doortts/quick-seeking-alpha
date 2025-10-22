# Seeking Alpha Link Modifier

[English](#english) | [한국어](#korean)

---

<a name="korean"></a>
## 한국어

### Seeking Alpha 링크 수정 확장 프로그램

Seeking Alpha의 기사 및 시장 뉴스 링크에 UTM 파라미터를 자동으로 추가하는 가벼운 Chrome 확장 프로그램입니다.

#### 주요 기능

- ✅ 설정된 패턴과 일치하는 링크 자동 수정 (기본값: `/article`, `/market-news`)
- ✅ 수정된 링크를 새 탭으로 열기
- ✅ 사용자 정의 가능한 UTM 파라미터 추가
- ✅ 깨끗한 URL을 위한 해시 프래그먼트 제거
- ✅ 동적으로 로드되는 콘텐츠 지원
- ✅ 옵션 페이지를 통한 완전한 설정 가능
- ✅ 실시간 설정 업데이트

#### 설치 방법

1. Chrome에서 `chrome://extensions/` 열기
2. 우측 상단의 **개발자 모드** 활성화
3. **압축해제된 확장 프로그램을 로드합니다** 클릭
4. 이 폴더 선택
5. 설치 완료!

#### 빠른 시작

1. https://seekingalpha.com 방문
2. 기사/시장 뉴스 링크에 마우스 오버
3. 상태 표시줄에서 추가된 UTM 파라미터 확인
4. 링크 클릭 → UTM 파라미터가 포함된 새 탭으로 열림

#### 설정 방법

**옵션 열기:**
- 확장 프로그램 아이콘 우클릭 → **옵션**
- 또는: `chrome://extensions/` → 세부정보 → 확장 프로그램 옵션

**URL 패턴 추가:**
1. `/`로 시작하는 패턴 입력 (예: `/news`)
2. **패턴 추가** 클릭
3. **설정 저장** 클릭

**UTM 접미사 변경:**
1. "UTM Postfix" 필드 수정
2. 파라미터 입력 (예: `?utm_source=custom&utm_medium=social`)
3. **설정 저장** 클릭

#### 기본 설정

```
활성화: 예
패턴: /article, /market-news
접미사: ?utm_source=nh&utm_medium=referral&feed_item_type=article
```

#### 작동 방식

1. Seeking Alpha 페이지의 모든 `<a>` 태그 찾기
2. href가 설정된 패턴과 일치하는지 확인
3. 해시 프래그먼트(`#...`)가 있으면 제거
4. href에 UTM 파라미터 추가
5. 새 탭으로 열리도록 클릭 핸들러 설정
6. 동적으로 로드되는 콘텐츠 감시

#### 예시

**원본 URL:**
```
/article/12345-stock-market-today
```

**수정된 URL:**
```
/article/12345-stock-market-today?utm_source=nh&utm_medium=referral&feed_item_type=article
```

**해시 프래그먼트가 있는 경우:**
```
원본: /article/12345#comments
수정: /article/12345?utm_source=nh&utm_medium=referral&feed_item_type=article
```

#### 문제 해결

**확장 프로그램이 작동하지 않을 때:**
- `chrome://extensions/`에서 확장 프로그램이 활성화되어 있는지 확인
- `*.seekingalpha.com/*`에서 작동하는지 확인
- 옵션 → "확장 프로그램 활성화"가 체크되어 있는지 확인

**링크가 수정되지 않을 때:**
- 페이지 새로고침
- 패턴이 URL과 일치하는지 확인 (예: 기사 페이지의 경우 `/article`)
- 콘솔(F12)에서 오류 확인

#### 개인정보 보호 및 보안

- ✅ 데이터 수집 없음
- ✅ 외부 요청 없음
- ✅ 추적 또는 분석 없음
- ✅ 로컬 DOM만 수정
- ✅ 설정은 Chrome에 로컬 저장
- ✅ 안전한 링크 열기 (`noopener,noreferrer`)

#### 권한

**storage**: 사용자 설정 저장
**host_permissions**: `*.seekingalpha.com/*`에서 링크 수정

#### 버전

**1.0.0** - 프로덕션 릴리스
- 깨끗하고 최적화된 코드
- 새 탭으로 열기
- 해시 프래그먼트 제거
- 설정 가능한 패턴 및 접미사
- 실시간 업데이트

---

<a name="english"></a>
## English

A lightweight Chrome extension that automatically appends UTM parameters to Seeking Alpha article and market-news links.

## Features

- ✅ Automatically modifies links matching configured patterns (default: `/article`, `/market-news`)
- ✅ Opens modified links in new tabs
- ✅ Adds customizable UTM parameters
- ✅ Removes hash fragments for clean URLs
- ✅ Works with dynamically loaded content
- ✅ Fully configurable via Options page
- ✅ Real-time settings updates

## Installation

### Load Unpacked Extension

1. Open Chrome: `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select this folder
5. Extension installed!

### Chrome Web Store (Future)

Package and submit to Chrome Web Store for easy installation.

## Quick Start

1. **Visit** https://seekingalpha.com
2. **Hover** over article/market-news links
3. **See** UTM parameters added in status bar
4. **Click** link → Opens in new tab with UTM params

## Configuration

### Open Options

- Right-click extension icon → **Options**
- Or: `chrome://extensions/` → Details → Extension options

### Add URL Pattern

1. Enter pattern starting with `/` (e.g., `/news`)
2. Click **Add Pattern**
3. Click **Save Settings**

### Change UTM Postfix

1. Edit "UTM Postfix" field
2. Enter parameters (e.g., `?utm_source=custom&utm_medium=social`)
3. Click **Save Settings**

### Default Settings

```
Enabled: Yes
Patterns: /article, /market-news
Postfix: ?utm_source=nh&utm_medium=referral&feed_item_type=article
```

## How It Works

1. Extension finds all `<a>` tags on Seeking Alpha pages
2. Checks if href matches configured patterns
3. Removes hash fragments (`#...`) if present
4. Adds UTM parameters to href
5. Sets click handler to open in new tab
6. Watches for dynamically loaded content

## Examples

### Original URL
```
/article/12345-stock-market-today
```

### Modified URL
```
/article/12345-stock-market-today?utm_source=nh&utm_medium=referral&feed_item_type=article
```

### With Hash Fragment
```
Original: /article/12345#comments
Modified: /article/12345?utm_source=nh&utm_medium=referral&feed_item_type=article
```

## File Structure

```
chrome-ext/
├── manifest.json          # Extension configuration
├── content.js             # Main link modification logic
├── options.html           # Settings UI
├── options.js             # Settings management
├── options.css            # UI styling
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # This file
```

## Browser Compatibility

- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ Brave (current)
- ✅ Opera 74+
- ✅ Arc (current)

## Troubleshooting

### Extension Not Working

- Check extension is enabled in `chrome://extensions/`
- Verify you're on `*.seekingalpha.com/*`
- Check Options → "Enable extension" is checked

### Links Not Modified

- Refresh the page
- Check pattern matches URL (e.g., `/article` for article pages)
- Open Console (F12) for any errors

### Links Not Opening in New Tab

- Extension should force new tab via click handler
- Check browser pop-up settings
- Ensure extension is loaded and active

## Privacy & Security

- ✅ No data collection
- ✅ No external requests
- ✅ No tracking or analytics
- ✅ Only modifies local DOM
- ✅ Settings stored locally in Chrome
- ✅ Secure link opening (`noopener,noreferrer`)

## Permissions

**storage**: Save user settings
**host_permissions**: Modify links on `*.seekingalpha.com/*`

## Common Use Cases

### Newsletter Tracking
```
?utm_source=newsletter&utm_medium=email&utm_campaign=daily
```

### Social Media Tracking
```
?utm_source=twitter&utm_medium=social&utm_campaign=organic
```

### Internal Navigation
```
?utm_source=internal&utm_medium=referral&utm_campaign=nav
```

## Development

### Make Changes

1. Edit files as needed
2. Go to `chrome://extensions/`
3. Click refresh icon on extension card
4. Test changes on Seeking Alpha

### Debug

1. Open DevTools (F12)
2. Console tab shows any errors
3. Check "Event Listeners" tab on links

## Package for Distribution

### Create ZIP

```bash
zip -r seeking-alpha-extension.zip . -x "*.git*" "*.DS_Store"
```

### Chrome Web Store

1. Create ZIP of extension files
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Upload ZIP
4. Fill in metadata
5. Submit for review

## License

MIT License - Free to use and modify

## Support

For issues or questions:
1. Check console for errors
2. Verify settings in Options
3. Reload extension
4. Check this README

## Version

**1.0.0** - Production Release
- Clean, optimized code
- New tab opening
- Hash fragment removal
- Configurable patterns and postfix
- Real-time updates

---

Made with ❤️ for better link tracking on Seeking Alpha
