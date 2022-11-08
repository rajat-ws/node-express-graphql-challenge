CREATE TABLE students
(
    id SERIAL NOT NULL PRIMARY KEY,
    name text NOT NULL,
    
    created_at timestamp
    WITH time zone DEFAULT NOW(),
    subject_id integer NOT NULL
    updated_at timestamp
    WITH time zone,
    deleted_at timestamp
    WITH time zone
);

CREATE INDEX students_city ON students USING btree (city)

