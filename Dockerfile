FROM continuumio/miniconda3

# RUN python -m pip install --upgrade pip
RUN conda install -c conda-forge sqlite flask -y

RUN echo "140.82.113.4 github.com" >> /etc/hosts
RUN git clone https://github.com/KAndHisC/todo-list.git
WORKDIR /todo-list

EXPOSE 80

CMD ["python", "main.py"]



