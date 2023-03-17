CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE todos (
    todo_id uuid DEFAULT uuid_generate_v4 (),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    assigned_to VARCHAR(100) NOT NULL,
    is_complete BOOLEAN NOT NULL,
    created_on CURRENT_DATE NOT NULL DEFAULT CURRENT_DATE,
    completed_on DATE NOT NULL,
    PRIMARY KEY (todo_id)
);

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4 (),
    username VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    PRIMARY KEY (user_id)
);