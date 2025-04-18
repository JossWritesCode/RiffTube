# frozen_string_literal: true

# Migration to create the riff_versions table, which stores versioned data for riffs.
class CreateRiffVersions < ActiveRecord::Migration[7.0]
  def change
    create_riff_versions_table
    add_riff_version_indexes
  end

  private

  def create_riff_versions_table
    create_table :riff_versions, id: :uuid do |table|
      add_riff_version_columns(table)
      table.timestamps
    end
  end

  def add_riff_version_columns(table)
    table.uuid    :riff_id,         null: false
    table.integer :version_number,  null: false
    table.text    :text_content
    table.uuid    :media_file_id
    table.column  :audio_source, :audio_source_enum
    table.jsonb   :tts_config
    table.jsonb   :styling
    table.uuid    :changed_by
    table.timestamp :changed_at, default: -> { 'CURRENT_TIMESTAMP' }
  end

  def add_riff_version_indexes
    add_index :riff_versions, :riff_id
    add_index :riff_versions, %i[riff_id version_number], unique: true
  end
end
