"""
Allow Django 5.x to connect to MySQL 5.7 on NextAlpha clusters.

Django 5.2+ raises NotSupportedError when the server is below 8.0.11. Our
app-tier MySQL remains 5.7 by design; feature detection still uses the real
server version — only the startup gate is bypassed.
"""


def apply_mysql57_compat():
    from django.db.backends.mysql.base import DatabaseWrapper

    DatabaseWrapper.check_database_version_supported = lambda self: None
