"""
WSGI 入口点文件
这是一个标准的 WSGI 入口点，用于 Gunicorn 和其他 WSGI 服务器
"""

from app import app

# 这是 WSGI 应用程序变量，Gunicorn 会自动寻找它
application = app

if __name__ == "__main__":
    app.run()
