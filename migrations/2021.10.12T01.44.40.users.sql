CREATE TABLE Users (
    id bigserial primary key,
    email varchar(254) NOT NULL,
    UNIQUE (email)
)