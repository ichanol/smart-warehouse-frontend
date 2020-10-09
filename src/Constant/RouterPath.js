const ROUTER_PATH = {
  login: { path: '/', title: 'Login' },
  notFound: { path: '/not-found', title: 'Not Found' },
  editImportExportProduct: {
    path: '/import-export/edit-product/:productid',
    title: 'Edit Product',
  },
  scanForProduct: {
    path: '/import-export/in-progress',
    title: 'Read Product List',
  },
  userSettings: { path: '/settings', title: 'Settings' },
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
}

export default ROUTER_PATH
