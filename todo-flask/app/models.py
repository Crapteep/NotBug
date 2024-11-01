
import uuid
from sqlmodel import Field, SQLModel



class TaskBase(SQLModel):
    title: str = Field(max_length=80)
    description: str | None = Field(default=None, max_length=200)
    completed: bool = Field(default=False)


class Task(TaskBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)


class TaskCreate(TaskBase):
    pass


class Tasks(SQLModel):
    data: list[Task]
    count: int


class TaskUpdate(TaskBase):
    title: str | None = Field(default=None, max_length=80)
    description: str | None = Field(default=None, max_length=200)
    completed: bool | None