CREATE TABLE students_subjects
(
    id SERIAL NOT NULL PRIMARY KEY,
    student_id integer NOT NULL,
    subject_id integer NOT NULL,
    created_at timestamp
    WITH time zone DEFAULT NOW(),
    updated_at timestamp
    WITH time zone,
    deleted_at timestamp
    WITH time zone,
    CONSTRAINT students_subjects_student_id FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT students_subjects_subject_id FOREIGN KEY (subject_id) REFERENCES subjects(id),

    CONSTRAINT student_subjects_unique_fkeys UNIQUE (student_id, subject_id);
);

CREATE INDEX student_id ON students_subjects USING btree (student_id)
CREATE INDEX subject_id ON students_subjects USING btree (subject_id)