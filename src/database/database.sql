CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE todos (
    todo_id uuid DEFAULT uuid_generate_v4 (),
    PRIMARY KEY (todo_id),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    assigned_to VARCHAR(100) NOT NULL,
    is_complete BOOLEAN NOT NULL,
    created_on DATE NOT NULL DEFAULT CURRENT_DATE,
    completed_on DATE NOT NULL,
)