import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cofig.settings")
django.setup()

from cofig.routing import application
