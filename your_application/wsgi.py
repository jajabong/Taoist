"""
WSGI 模块，满足 Render 的 your_application.wsgi 导入要求
"""

# 从主应用导入应用实例
from app import app

# 这是 Gunicorn 将查找的应用变量
application = app
wsgi = app

# 如果直接运行此文件，则启动应用
if __name__ == "__main__":
    app.run()
