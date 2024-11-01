from pydantic import BaseModel, ValidationError
from functools import wraps
from sqlalchemy.exc import SQLAlchemyError
from flask import request, jsonify, g
from typing import Callable
import logging
from werkzeug.exceptions import BadRequest, NotFound


logger = logging.getLogger(__name__)


def validate_request(model: BaseModel):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs): 
            try:
                data = model(**request.json)
                return f(validated_data=data, *args, **kwargs)
            except ValidationError as e:
                return jsonify(e.errors()), 400
        return wrapper
    return decorator


def handle_exceptions(f: Callable):
    @wraps(f)
    def wrapper(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        
        except BadRequest as e:
            return jsonify({
                "error": "Bad Request",
                "message": str(e)
            }), 400
        
        except NotFound as e:
            return jsonify({
                "error": "Not Found",
                "message": str(e)
            }), 404
        
        except ValueError as e:
            return jsonify({
                "error": "Invalid Input",
                "message": str(e)
            }), 400
        
        except SQLAlchemyError as e:
            session = g.db
            session.rollback()
            return jsonify({
                "error": "Database Error",
                "message": str(e)
            }), 500
        
        except Exception as e:
            return jsonify({
                "error": "Internal Server Error",
                "message": "An unexpected error occurred"
            }), 500
            
    return wrapper