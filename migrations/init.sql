CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    short_id VARCHAR(10) UNIQUE NOT NULL,
    long_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE url_visits (
    id SERIAL PRIMARY KEY,
    short_id VARCHAR(10) REFERENCES urls(short_id),
    visited_at TIMESTAMP DEFAULT NOW()
);
