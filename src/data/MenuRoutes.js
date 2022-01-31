export default {
  home: new MenuItem('Home', '/'),
  routes: new MenuItem('Routes', '/routes'),
  ready: new MenuItem('Ready for Rwanda', '/ready-for-rwanda'),
}

function MenuItem(name, route) {
  this.name = name;
  this.route = route;
}