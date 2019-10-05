## express-generator

## 配置
express有一个极简的环境驱动配置系统，全部由环境变量`NODE_ENV`驱动。
+ `app.set()`
+ app.get()
+ app.enable()
+ app.disable()
+ app.enabled()
+ app.disabled()

## 模版缓存
app.set("view cache", true);

向视图传递数据的几种方式：
1. res.render('view-path', data);
2. app.locals 应用层的数据
3. res,locals 请求层的数据