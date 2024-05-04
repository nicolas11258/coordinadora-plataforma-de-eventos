CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    fk_creator_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_creator_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS event_attendee (
    id SERIAL PRIMARY KEY,
    fk_event_id INTEGER,
    fk_user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_event_id) REFERENCES event (id),
    FOREIGN KEY (fk_user_id) REFERENCES "user" (id)
);

-- Column comments
COMMENT ON COLUMN "user".id IS 'Unique identifier of the user';
COMMENT ON COLUMN "user".name IS 'Name of the user';
COMMENT ON COLUMN "user".email IS 'Email address of the user';
COMMENT ON COLUMN "user".password IS 'Password of the user';
COMMENT ON COLUMN "user".created_at IS 'Timestamp of user creation';
COMMENT ON COLUMN "user".updated_at IS 'Timestamp of user update';

COMMENT ON COLUMN "event".id IS 'Unique identifier of the event';
COMMENT ON COLUMN "event".title IS 'Title of the event';
COMMENT ON COLUMN "event".description IS 'Description of the event';
COMMENT ON COLUMN "event".date IS 'Date and time of the event';
COMMENT ON COLUMN "event".location IS 'Location of the event';
COMMENT ON COLUMN "event".fk_creator_id IS 'ID of the creator of the event';
COMMENT ON COLUMN "event".created_at IS 'Timestamp of event creation';
COMMENT ON COLUMN "event".updated_at IS 'Timestamp of event update';

COMMENT ON COLUMN event_attendee.id IS 'Unique identifier of the event attendee';
COMMENT ON COLUMN event_attendee.fk_event_id IS 'ID of the event that the user is attending';
COMMENT ON COLUMN event_attendee.fk_user_id IS 'ID of the user attending the event';
