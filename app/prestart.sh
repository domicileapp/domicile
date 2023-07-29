#! /usr/bin/env bash

# Let the DB start
python ./domicile/prestart.py

# Run migrations
alembic upgrade head

# Create initial data in DB
python ./domicile/init_data.py
