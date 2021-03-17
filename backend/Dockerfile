FROM python:3.7

WORKDIR /app
RUN pip install poetry

COPY manage.py pyproject.toml poetry.lock /app/
RUN poetry install --no-root

EXPOSE 8000

CMD ["poetry", "run", "gunicorn", "--reload", "-b", "0.0.0.0:8000", "kpi.wsgi"]
