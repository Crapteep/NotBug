from flask import Flask, g
from app.core.config import settings
from app.api.routers.tasks import tasks_bp
from flask_cors import CORS
from app.api.deps import get_db


def create_app():
    app = Flask(__name__)

    @app.before_request
    def before_request():
        g.db = next(get_db())

    @app.teardown_appcontext
    def teardown_db(exception):
        db = g.pop('db', None)
        if db is not None:
            db.close()

    if settings.BACKEND_CORS_ORIGINS:
        CORS(app, resources={r"/*": {"origins": [str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS]}})

    app.config["SQLALCHEMY_TRAC_MODIFICATIONS"] = False

    app.register_blueprint(tasks_bp, url_prefix=f"{settings.API_V1_STR}/tasks")
    return app


app = create_app()

if __name__ == '__main__':
    
    app.run()