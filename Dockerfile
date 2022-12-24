FROM python:3.9

RUN python -m pip install --upgrade pip
RUN pip install flask

RUN git clone https://github.com/KAndHisC/todo-list.git
WORKDIR /todo-list

EXPOSE 80

CMD ["python", "main.py"]



