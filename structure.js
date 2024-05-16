// 路由结构

const router = {
  stack: [
    // 里面很多layer
    {
      path: "/api/user",
      route: {
        stack: [
          // 里面存了多个method和回调函数
          {
            method: "GET",
            handle: function1,
          },
          {
            method: "POST",
            handle: function2,
          },
        ],
      },
    },
  ],
}

// 通过这个数据结构我们可以知道，整个流程分为两部分，第一部分注册路由，第二部分匹配路由，当我们写app.get和app.post这些方法时，其实就是在router上添加layer和route
// 当一个网络请求过来时，其实就是遍历layer和route，找到对应的handle拿出来执行
// 这里有个奇怪的地方，就是route数组里面的结构，每一项按理说应该使用新的数据结构来存储，比如 routeItem之类，
// 但是Express并没有这么做，而是将它和layer合在一起了，给layer添加了method、handle属性，所以这里layer同时存在于router的stack和route的stack
