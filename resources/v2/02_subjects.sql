CREATE TABLE subjects
(
    id SERIAL NOT NULL PRIMARY KEY,
    name text NOT NULL,
    kind text NOT NULL,
    
    created_at timestamp
    WITH time zone DEFAULT NOW(),
    updated_at timestamp
    WITH time zone,
    deleted_at timestamp
    WITH time zone
);

CREATE INDEX subjects_id ON USING btree (id)
CREATE INDEX subjects_name ON USING btree (name)
CREATE INDEX subjects_kind ON USING btree (kind)

