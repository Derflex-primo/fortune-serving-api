import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: './src/swagger/output/bundled.yaml',
  output: './src/@types'
});