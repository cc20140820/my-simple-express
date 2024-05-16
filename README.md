# my-simple-express
手写Express.js源码

## 总结
1. Express也是用原生API `http.createServer`来实现的。
2. Express的主要工作是将`http.createServer`的回调函数拆出来了，构建了一个路由结构Router。
3. 这个路由结构由很多层layer组成。
4. 一个中间件就是一个layer。
5. 路由也是一个layer，layer上有一个path属性来表示他可以处理的API路径。
6. path可能有不同的method，每个method对应`layer.route`上的一个layer。
7. `layer.route`上的layer虽然名字和router上的layer一样，但是功能侧重点并不一样，这也是源码中让人困惑的一个点。
8. `layer.route`上的layer的主要参数是method和handle，如果method匹配了，就执行对应的handle。
9. 整个路由匹配过程其实就是遍历`router.layer`的一个过程。
10. 每个请求来了都会遍历一遍所有的layer，匹配上就执行回调，一个请求可能会匹配上多个layer。


总体来看，Express代码给人的感觉并不是很完美，特别是Layer类肩负两种职责，跟软件工程强调的单一职责原则不符，这也导致Router，Layer，Route三个类的调用关系有点混乱。而且对于继承和原型的使用都是很老的方式。可能也是这种不完美催生了Koa的诞生。

