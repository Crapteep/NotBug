
from sqlmodel import Session, select, func, delete, col
from app.models import TaskCreate, Task, Tasks, TaskUpdate
from uuid import UUID
from typing import Optional, Any


def create_task(*, session: Session, task_create: TaskCreate) -> Task:
    db_obj = Task.model_validate(task_create)
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def get_tasks(*, session: Session, skip: int = 0, limit: int | None = 100) -> Tasks:
    statement = select(Task).offset(skip)
    if limit is not None:
        statement = statement.limit(limit)
    
    tasks = session.exec(statement).all()
    count = len(tasks)
    
    return Tasks(data=tasks, count=count)


def get_task(*, session: Session, task_id: UUID) -> Optional[Task]:
    statement = select(Task).where(Task.id == task_id)
    task = session.exec(statement).first()
    return task


def update_task(*, session: Session, db_task: Task, task_in: TaskUpdate) -> Any:
    task_data = task_in.model_dump(exclude_unset=True)
    
    db_task.sqlmodel_update(task_data)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task
