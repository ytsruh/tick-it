To get Create React App to work when served from ExpressJS app must add additional steps:

1. Create .env file
2. Add "INLINE_RUNTIME_CHUNK=false" to .env file
3. This should automatically run when running build command
