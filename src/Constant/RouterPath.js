const ROUTER_PATH = {
  notInNavBar: {
    login: '/',
    notFound: '/not-found',
    editImportExportProduct: '/import-export/edit-product/:productid',
    scanForProduct: '/import-export/in-progress',
    userSettings: '/settings',
  },
  navBar: {
    overview: { path: '/overview', title: 'Overview' },
    currentProductBalance: { path: '/product-list', title: 'Product List' },
    importExportMenu: {
      path: '/import-export',
      title: 'Import-Export Product',
    },
    transaction: { path: '/transaction', title: 'Transaction' },
    map: { path: '/map', title: 'Map' },
    userManagement: {
      path: '/user-management',
      title: 'User Management',
    },
    productManagement: {
      path: '/product-management',
      title: 'Product Management',
    },
    roleManagement: { path: '/role-management', title: 'Role management' },
  },
}

export default ROUTER_PATH
