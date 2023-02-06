export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())


  return{
    plugins: [react()], 

    "compilerOptions": {
      "baseUrl": "src"
    },
    "include": ["src"],
    

    server: {
      host: true,
      port : 3000,
      proxy: {
        '/api': {
          target: env.VITE_PROXY,
          changeOrigin: true,
          secure: false,
        } 
      }
    },
  }
})


