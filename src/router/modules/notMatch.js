

const route = {
  path: '*',
  redirect: '/error/notFound',
  meta: {
    hiddenInMenu: true,
    noCache: true
  }
}

export default route;
