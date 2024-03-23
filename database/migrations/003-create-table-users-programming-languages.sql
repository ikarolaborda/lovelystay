CREATE TABLE user_programming_languages
(
    user_id                 INTEGER NOT NULL REFERENCES users (id),
    programming_language_id INTEGER NOT NULL REFERENCES programming_languages (id),
    PRIMARY KEY (user_id, programming_language_id)
);
