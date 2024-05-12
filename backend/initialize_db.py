# абсолютные импорты, относительно корня вашего пакета
from models import Base, engine  # Если `backend` это пакет, в котором лежат файлы

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()