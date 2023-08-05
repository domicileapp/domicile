from core.exceptions.base import CustomException
from fastapi import Depends, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer


class AuthenticationRequiredException(CustomException):
    code = status.HTTP_401_UNAUTHORIZED
    error_code = status.HTTP_401_UNAUTHORIZED
    message = "Authentication required"


class AuthenticationRequired:
    def __init__(
        self,
        token: HTTPAuthorizationCredentials = Depends(HTTPBearer(auto_error=False)),
    ):
        if not token:
            raise AuthenticationRequiredException()
