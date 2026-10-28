export default {
  id: 'org.owdproject.atproto',
  title: 'Account',
  category: 'internet',
  provides: {
    name: 'auth',
    entry: 'atproto',
  },
  icon: 'weui:at-filled',
  windows: {
    account: {
      component: () => import('./components/Window/WindowAtprotoAccount.vue'),
      resizable: false,
      size: {
        width: 400,
        height: 500,
      },
      position: {
        x: 400,
        y: 240,
        z: 0,
      },
    },
  },
  entries: {
    atproto: {
      command: 'atproto',
    },
  },
  commands: {
    atproto: (app: any, args) => {
      app.openWindow('account')
    },
  },
}
