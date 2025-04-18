# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_04_16_162408) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "audio_source_enum", ["recorded", "synth"]
  create_enum "commentable_type_enum", ["project", "riff"]
  create_enum "storage_provider_enum", ["gcs", "url"]

  create_table "audit_logs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.text "action", null: false
    t.string "entity_type", null: false
    t.uuid "entity_id", null: false
    t.jsonb "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entity_type", "entity_id"], name: "index_audit_logs_on_entity_type_and_entity_id"
    t.index ["user_id"], name: "index_audit_logs_on_user_id"
  end

  create_table "collaborations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "project_id", null: false
    t.uuid "role_id", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "project_id"], name: "index_collaborations_on_user_id_and_project_id", unique: true
  end

  create_table "comments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.string "commentable_type", null: false
    t.uuid "commentable_id", null: false
    t.text "content", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
  end

  create_table "media_files", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.enum "provider", default: "gcs", enum_type: "storage_provider_enum"
    t.string "bucket"
    t.string "object_path"
    t.text "public_url"
    t.string "file_type", null: false
    t.float "duration_seconds"
    t.bigint "size_bytes"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_media_files_on_user_id"
  end

  create_table "project_riffs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "project_id", null: false
    t.uuid "riff_id", null: false
    t.float "start_time"
    t.float "end_time"
    t.jsonb "optional_settings"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id", "riff_id"], name: "index_project_riffs_on_project_id_and_riff_id", unique: true
    t.index ["project_id"], name: "index_project_riffs_on_project_id"
    t.index ["riff_id"], name: "index_project_riffs_on_riff_id"
  end

  create_table "project_tags", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "project_id", null: false
    t.uuid "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id", "tag_id"], name: "index_project_tags_on_project_id_and_tag_id", unique: true
    t.index ["project_id"], name: "index_project_tags_on_project_id"
    t.index ["tag_id"], name: "index_project_tags_on_tag_id"
  end

  create_table "projects", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "owner_id", null: false
    t.string "title", null: false
    t.string "video_host", null: false
    t.string "video_id"
    t.text "video_url"
    t.string "visibility", default: "private"
    t.string "shareable_link"
    t.uuid "forked_from_project_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shareable_link"], name: "index_projects_on_shareable_link", unique: true
  end

  create_table "riff_reactions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "riff_id", null: false
    t.uuid "user_id", null: false
    t.string "reaction_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["riff_id", "user_id"], name: "index_riff_reactions_on_riff_id_and_user_id", unique: true
  end

  create_table "riff_versions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "riff_id", null: false
    t.integer "version_number", null: false
    t.text "text_content"
    t.uuid "media_file_id"
    t.enum "audio_source", enum_type: "audio_source_enum"
    t.jsonb "tts_config"
    t.jsonb "styling"
    t.uuid "changed_by"
    t.datetime "changed_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["riff_id", "version_number"], name: "index_riff_versions_on_riff_id_and_version_number", unique: true
    t.index ["riff_id"], name: "index_riff_versions_on_riff_id"
  end

  create_table "riffs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "created_by", null: false
    t.string "title"
    t.uuid "latest_revision_id"
    t.integer "current_version", default: 1
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_roles_on_name", unique: true
  end

  create_table "subscriptions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.jsonb "features"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_subscriptions_on_name", unique: true
  end

  create_table "tags", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "user_preferences", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.boolean "autosave", default: true
    t.jsonb "settings"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_preferences_on_user_id", unique: true
  end

  create_table "user_relationships", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "from_user_id", null: false
    t.uuid "to_user_id", null: false
    t.string "relationship_type"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["from_user_id", "to_user_id", "relationship_type"], name: "index_user_relationships_unique", unique: true
  end

  create_table "user_subscriptions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "subscription_id", null: false
    t.datetime "started_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "ends_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "subscription_id"], name: "index_user_subscriptions_on_user_id_and_subscription_id", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "name"
    t.string "password_digest"
    t.string "provider"
    t.string "uid"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["uid"], name: "index_users_on_uid", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "audit_logs", "users"
  add_foreign_key "project_riffs", "projects"
  add_foreign_key "project_riffs", "riffs"
  add_foreign_key "projects", "projects", column: "forked_from_project_id"
  add_foreign_key "projects", "users", column: "owner_id"
  add_foreign_key "riffs", "riff_versions", column: "latest_revision_id"
  add_foreign_key "riffs", "users", column: "created_by"
end
