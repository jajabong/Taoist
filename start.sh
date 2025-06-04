#!/bin/bash
# 启动脚本 - 确保使用正确的 gunicorn 命令

echo "Starting application with gunicorn app:app"
exec gunicorn app:app
