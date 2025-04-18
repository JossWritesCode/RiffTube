# frozen_string_literal: true

# rubocop:disable Rails/ReversibleMigration

# This migration creates custom ENUM types for use in the database.
class CreateEnumTypes < ActiveRecord::Migration[7.0]
  def change
    execute <<-SQL
      CREATE TYPE commentable_type_enum AS ENUM ('project', 'riff');
    SQL

    execute <<-SQL
      CREATE TYPE audio_source_enum AS ENUM ('recorded', 'synth');
    SQL

    execute <<-SQL
      CREATE TYPE storage_provider_enum AS ENUM ('gcs', 'url');
    SQL
  end
end
# rubocop:enable Rails/ReversibleMigration
