export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mintland',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    {
      src: '~/assets/css/main.scss',
      lang: 'scss'
    },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    {
      src: '~plugins/supabase.js',
      ssr: true
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
  publicRuntimeConfig: {
    VUE_SUPABASE_URL:  process.env.VUE_SUPABASE_URL,
    VUE_SUPABASE_KEY:  process.env.VUE_SUPABASE_KEY
  },
  env: {
    VUE_SUPABASE_URL:  process.env.VUE_SUPABASE_URL,
    VUE_SUPABASE_KEY:  process.env.VUE_SUPABASE_KEY,
    BASE_URL:  process.env.BASE_URL
  },
  dev: process.env.NODE_ENV === 'DEV'
}
