from models import Base, engine 

"""
This script is used to initialize the database for the application. 

It sets up the database schema by creating all the necessary tables defined in the SQLAlchemy models.
This script should be run when you need to set up a new database or update the schema of an existing database.

Usage:
    Run this script directly to create all tables in the database:
    python init_db.py

Note:
    Ensure that the database configurations (such as URI) are correctly set in the models module before running this script.
"""

# Function to initialize the database
def init_db():
    # Create all tables in the database
    # This is equivalent to "Create Table" statements in raw SQL
    Base.metadata.create_all(bind=engine)

# Entry point of the script
if __name__ == "__main__":
    init_db()  # Call the function to initialize the database
