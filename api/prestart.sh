#! /usr/bin/env bash

# Let the DB start
python prestart.py

# Run migrations
alembic upgrade head

# Create initial data in DB
python init_data.py
