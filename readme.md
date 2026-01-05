

# first install react using 
npm create vite@latest .
(for that node should be installed in your device)

# install styled-components using
npm install styled-components


# install -cors-headers
pip3 install django-cors-headers
1>Add it to INSTALLED_APPS in settings.py:
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]


2>Add the middleware at the top of the middleware list:
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

 3>Allow your frontend origin:

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

4>Or, for development only, allow all origins:

CORS_ALLOW_ALL_ORIGINS = True
Restart Django server.

