const ROUTER_PATH = {
  login: { path: '/', title: 'Login' },
  notFound: { path: '/not-found', title: 'Not Found' },
  map: { path: '/map', title: 'Map' },
  userSettings: { path: '/settings', title: 'Settings' },
  overview: { path: '/overview', title: 'Overview' },
  currentProductBalance: { path: '/product-list', title: 'Product List' },
  importExportMenu: {
    path: '/import-export',
    title: 'Import-Export Product',
  },
  editImportExportProduct: {
    path: '/import-export/edit-product/:productid',
    title: 'Edit Product',
  },
  transaction: { path: '/transaction', title: 'Transaction' },
  editTransaction: { path: '/transaction/edit-transaction/:transactionref', title: 'Edit Transaction' },
  userManagement: {
    path: '/user-management',
    title: 'User Management',
  },
  productManagement: {
    path: '/product-management',
    title: 'Product Management',
  },
  roleManagement: { path: '/role-management', title: 'Role management' },
  createProduct: {
    path: '/product-management/create',
    title: 'Create New Product',
  },
  editProduct: {
    path: '/product-management/edit/:productid',
    title: 'Edit Product Information',
  },
  createRole: {
    path: '/role-management/create',
    title: 'Create New Role',
  },
  editRole: {
    path: '/role-management/edit/:rolename',
    title: 'Edit Role Information',
  },
  createUser: {
    path: '/user-management/create',
    title: 'Create New Role',
  },
  editUser: {
    path: '/user-management/edit/:username',
    title: 'Edit User Information',
  },
}

export default ROUTER_PATH
