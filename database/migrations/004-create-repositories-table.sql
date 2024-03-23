CREATE TABLE repositories
(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    name        TEXT    NOT NULL,
    url         TEXT,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
