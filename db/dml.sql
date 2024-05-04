-- Registering a new user:
INSERT INTO "user" (name, email, password)
VALUES ('User Name', 'user@example.com', 'secure_password');

-- Logging in an existing user:
SELECT * FROM "user"
WHERE email = 'user@example.com' AND password = 'secure_password';

-- Creating a new event:
INSERT INTO "event" (title, description, event_date, event_location, fk_creator_id)
VALUES ('Event Title', 'Event Description', '2024-05-02 18:00:00', 'Event Location', 1);

-- Retrieve all events:
SELECT * FROM "event";

-- Retrieve an event by ID:
SELECT * FROM "event"
WHERE id = 1;

-- Updating an event:
UPDATE "event"
SET title = 'New Event Title', description = 'New Event Description'
WHERE id = 1;

-- Deleting an event and its attendees:
DELETE FROM event_attendee
WHERE fk_event_id = 1;

DELETE FROM "event"
WHERE id = 1;

-- Registering an attendee for an event:
INSERT INTO event_attendee (fk_event_id, fk_user_id)
VALUES (1, 2);

-- Retrieve attendees of an event:
SELECT "user".name
FROM event_attendee
JOIN "user" ON event_attendee.fk_user_id = "user".id
WHERE fk_event_id = 1;
