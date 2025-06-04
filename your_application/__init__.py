"""
初始化 your_application 包
这是为了满足 Render 的 your_application.wsgi 导入要求
"""

# 从主应用导入应用实例
from app import app

# 设置 wsgi 变量，以便 Gunicorn 可以找到它
wsgi = app
