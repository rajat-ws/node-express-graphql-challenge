CREATE TABLE subjects
(
    id SERIAL NOT NULL PRIMARY KEY,
    name text NOT NULL,
    
    created_at timestamp
    WITH time zone DEFAULT NOW(),
    updated_at timestamp
    WITH time zone,
    deleted_at timestamp
    WITH time zone
);

CREATE INDEX subjects_name ON subjects USING btree (name);

