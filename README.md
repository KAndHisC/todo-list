# Todo-list Web Server

本项目是一个容器化的todo list服务，仅使用python flask后端和js前端。

## 环境和部署

### 1、使用容器部署

确保本机上装有docker环境。如还未安装docker环境，请参考[docker官方文档](https://docs.docker.com/engine/install/)安装。使用如下命令拉取镜像和启动服务。
```
docker pull takiwang/todolist
docker run -it -p {your_port}:80 takiwang/todolist
```
### 2、直接从源码部署：
非容器环境部署时，请为你的python环境安装flask，且确保你的python标准库中，sqlite3的版本大于3.35，如果使用conda环境，可以执行如下命令：
```
conda install -c conda-forge sqlite flask -y
```
运行服务，执行如下命令：
```
python main.py
```
端口默认开放在80，如需更改，请修改main.py：
```
if __name__ == '__main__':
    app.run(host='0.0.0.0',port={your_port})
```