interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_GITHUB_CLIENT_ID: string
  readonly VITE_LOCAL_IP: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
