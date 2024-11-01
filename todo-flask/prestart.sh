#! /usr/bin/env bash

echo "running alembic migrations"
alembic upgrade head
