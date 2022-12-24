
from flask import Flask, jsonify, send_file
# from flask import redirect, request, template, validate
import db_op

app = Flask(__name__)

@app.route('/api/test')
def test():
    return jsonify({'success': True, 'id': None})

@app.route('/api/items')
def get_items():
    return jsonify({'items': db_op.get_items(), 'success': True})

@app.route('/api/add/<item>')
def add_item(item):
    id = db_op.add_item(item)
    if item != '' and id:
        return jsonify({'id':id, 'success': True})
    else:
        return jsonify({'success': False})

@app.route('/api/mark/<item_id>')
def mark_done(item_id):
    if db_op.mark_done(item_id):
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

@app.route('/api/delete/<item_id>')
def delete_item(item_id):
    if db_op.delete_item(item_id):
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

@app.route('/api/clear')
def delete_completed():
    if db_op.delete_completed():
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

@app.route('/')
def index():
    return send_file('./static/index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_file('./static/'+path)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)