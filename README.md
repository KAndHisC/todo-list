# Todo-list Web Server

本项目是一个容器化的todo list服务，仅使用python flask后端和js前端。

## 环境和部署

使用容器部署时，确保本机上装有docker环境。如还未安装docker环境，请参考[docker官方文档](https://docs.docker.com/engine/install/)安装。使用如下命令拉取镜像和启动服务。
```
docker pull takiwang/todolist
docker run -it -p {your_port}:80 takiwang/todolist
```
非容器环境部署时，请确保你的python标准库中，sqlite3的版本大于3.5