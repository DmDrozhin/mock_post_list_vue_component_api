const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/mock_post_list_vue_component_api'
      : '/',
  //publicPath: '/mock_post_list_vue_component_api',
})
