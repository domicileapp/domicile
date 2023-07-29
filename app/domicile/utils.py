import logging
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional

from jose import jwt

from app.domicile.core.config import settings
