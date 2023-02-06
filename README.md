# ʕ •́؈•̀) `rmp-api`

An API wrapper for Rate My Professor, built for [the "Rate My Professor, for ACC" Chrome extension.](https://chrome.google.com/webstore/detail/rate-my-professor-for-acc/oekeigfkekkohaffahehenjejpdpnpdp)

## Chrome Extension

![screenshot1](https://user-images.githubusercontent.com/52974834/217102990-8b4b1dc8-4e6c-4436-adf3-52cb7169d538.png)


## Routes
- **`school/`**
  - `schoolID` (RMP school ID)
  - `query` (school to search for)

- **`professor/`**
  - `schoolID` (RMP school ID)
  - `query` (school to search for)

- **`professor-details/`**
  - `schoolID` (RMP school ID)
  - `query` (school to search for)
  - `numRatings` (number of ratings to return)

## Running
```
npm install
wrangler dev
```

## Testing
```
npm run test
```
OR, to open a test coverage page (if it doesn't open, then you'll have to manually open `coverage/index.html`)
```
npm run test_cov_open
```

## Publishing
```
wrangler publish
```
