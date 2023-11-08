const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: process.env.NODE_ENV === 'production' ? '/REPO_NAME/' : '/',
  publicPath: '/mock_post_list_vue_component_api',
})
