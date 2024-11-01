from flask import Blueprint, g, jsonify, request
from app.utils import validate_request, handle_exceptions
from app.models import Task, TaskCreate, TaskUpdate
from typing import Any
from app import crud
from sqlmodel import Session, delete
import logging


tasks_bp = Blueprint('tasks', __name__)

logger = logging.getLogger(__name__)

@tasks_bp.route('/', methods=["POST"])
@validate_request(model=TaskCreate)
@handle_exceptions
def create_task(validated_data) -> Any:
    """Create new task"""
    session: Session = g.db

    task = crud.create_task(session=session, task_create=validated_data)
    return jsonify(task.model_dump()), 201


@tasks_bp.route('/', methods=["GET"])
@handle_exceptions
def get_tasks():
    """Retrieve tasks"""
    session: Session = g.db
    skip = request.args.get('skip', default=0, type=int)
    limit = request.args.get('limit', default=100, type=int)

    tasks = crud.get_tasks(session=session, skip=skip, limit=limit)
    return jsonify(tasks.model_dump())
   

@tasks_bp.route('/<uuid:id>', methods=["GET"])
@handle_exceptions
def get_task(id):
    """Get task by id"""
    session: Session = g.db

    task = crud.get_task(session=session, taks_id=id)
    if task is None:
        return jsonify({
            "error": "Task not found",
            "message": f"Task with id {id} does not exist"
        }), 404
    
    return jsonify(task.model_dump())


@tasks_bp.route('/<uuid:id>', methods=["PUT"])
@validate_request(model=TaskUpdate)
@handle_exceptions
def update_task(id, validated_data):
    """Update existing task"""
    session: Session = g.db
    db_task = session.get(Task, id)

    if not db_task:
        return jsonify({
            "error": "Task not found",
            "message": f"Task with id {id} does not exist"
        }), 404
    
    db_task = crud.update_task(session=session, db_task=db_task, task_in=validated_data)
    return jsonify(db_task.model_dump())
    

@tasks_bp.route('/<uuid:id>', methods=["DELETE"])
@handle_exceptions
def delete_task(id):
    """Delete task by id"""
    session: Session = g.db
    task = crud.get_task(session=session, task_id=id)
    
    if task is None:
        return jsonify({
            "error": "Task not found", 
            "message": f"Task with id {id} does not exist"
        }), 404
    
    session.delete(task)
    session.commit()
    
    return jsonify({
        "message": "Task deleted successfully"
    }), 200


@tasks_bp.route('/', methods=["DELETE"])
@handle_exceptions
def delete_all_tasks():
    """Delete all tasks"""
    session: Session = g.db
    
    try:
        deleted_count = session.exec(delete(Task)).rowcount
        session.commit()
        
        return jsonify({
            "message": f"Deleted {deleted_count} tasks successfully"
        }), 200
    except Exception as e:
        session.rollback()
        return jsonify({
            "error": "Failed to delete tasks",
            "message": str(e)
        }), 500

