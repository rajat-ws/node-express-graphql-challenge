CREATE TABLE students
(
    id SERIAL NOT NULL PRIMARY KEY,
    name text NOT NULL,
    city text NOT NULL,
    age integer NOT NULL,
    
    created_at timestamp
    WITH time zone DEFAULT NOW(),
    subject_id integer NOT NULL
    updated_at timestamp
    WITH time zone,
    deleted_at timestamp
    WITH time zone
);

CREATE INDEX students_name ON students USING btree (name)
CREATE INDEX students_city ON students USING btree (city)

