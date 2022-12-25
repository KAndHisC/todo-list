import sqlite3


def add_item(item):
    con = sqlite3.connect('database/todo.db')
    result = None
    try:
        cursor = con.execute("INSERT INTO todo (task,status) VALUES ('{}',0) RETURNING id".format(item))
        row = cursor.fetchone()
        con.commit()
        if row:
            result = row[0]
    except:
        pass
    finally:
        con.close()
    return result

def get_items():
    con = sqlite3.connect('database/todo.db')
    result = []
    try:
        cursor = con.execute("SELECT id, task, status FROM todo")
        result = cursor.fetchall()
    except:
        con.execute("CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY, task char(100) NOT NULL, status bool NOT NULL)")
        con.commit()
    finally:
        con.close()
    return result
    

def mark_done(item_id):
    con = sqlite3.connect('database/todo.db')
    result = True
    try:
        con.execute("UPDATE todo SET status=1-status WHERE id={}".format(item_id))
        con.commit()
    except:
        result = False
    finally:
        con.close()
    return result

def delete_item(item_id):
    con = sqlite3.connect('database/todo.db')
    result = True
    try:
        con.execute("DELETE FROM todo WHERE id={}".format(item_id))
        con.commit()
    except:
        result = False
    finally:
        con.close()
    return result

def delete_completed():
    con = sqlite3.connect('database/todo.db')
    result = True
    try:
        con.execute("DELETE FROM todo WHERE status=1")
        con.commit()
    except:
        result = False
    finally:
        con.close()
    return result


