# ʕ •́؈•̀) `rmp-api`

An API wrapper for Rate My Professor, built for the "Rate My Professor, for ACC" Chrome extension.

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
