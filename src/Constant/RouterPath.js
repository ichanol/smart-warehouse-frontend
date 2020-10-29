const ROUTER_PATH = {
  login: { path: '/', title: 'Login' },
  notFound: { path: '/not-found', title: 'Not Found' },
  editImportExportProduct: {
    path: '/import-export/edit-product/:productid',
    title: 'Edit Product',
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
  createProduct: {
    path: '/product-management/create',
    title: 'Create New Product',
  },
  editProduct: {
    path: '/product-management/edit/:productid',
    title: 'Edit Product Information',
  },
  roleManagement: { path: '/role-management', title: 'Role management' },
  createRole: {
    path: '/role-management/create',
    title: 'Create New Role',
  },
  editRole: {
    path: '/role-management/edit/:rolename',
    title: 'Edit Role Information',
  },
}

export default ROUTER_PATH
