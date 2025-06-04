"""
Render 部署适配文件
由于 Render 似乎坚持使用 your_application.wsgi 作为入口点，我们创建这个文件来适应它
"""

# 导入真正的应用程序
from app import app

# 创建一个 wsgi 变量，这是 Gunicorn 在使用 your_application.wsgi 时会查找的
wsgi = app
application = app

if __name__ == "__main__":
    app.run()
